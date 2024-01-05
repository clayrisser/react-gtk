/*
 *  File: /src/elements/Element.ts
 *  Project: @react-gtk/core
 *  File Created: 01-12-2023 05:55:50
 *  Author: Clay Risser
 *  -----
 *  BitSpur (c) Copyright 2017 - 2023
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import GObject from '@girs/node-gobject-2.0';
import Gtk from '@girs/node-gtk-4.0';
import PropTypes from 'prop-types';
import kebabCase from 'lodash.kebabcase';
import { Changes, DeferredOperation, GtkNode, Instance, ReconcilePhase, TextInstance } from '../types';
import { buildCssDeclaration, psuedoClasses } from '../style';
import { parseDimension } from '../yoga';
import { DimensionValue } from 'react-native';

const logger = console;
let _propertyList: string[] | undefined;
let _availableSignals: Set<string> | undefined;

export abstract class Element<Node extends GtkNode = GtkNode, Props extends Record<string, any> = Record<string, any>>
  implements Instance<Node, Props>
{
  static defaultProps: Record<string, any> = {};

  static propTypes: object = {};

  id: string;

  type = 'Unknown';

  props: Props;

  children: Instance[] = [];

  parent?: Instance<GtkNode, Record<string, any>>;

  node: Node;

  mounted = false;

  reconcilePhase = ReconcilePhase.Render;

  protected styleContext?: Gtk.StyleContext;

  private deferredOperations: (() => void)[] = [];

  private cssBlocks: Record<number, string[]> = {};

  private connectedSignals: Record<string, number> = {};

  private classNames: Set<string> = new Set();

  constructor(node: Node, props: Props = {} as Props) {
    this.props = this.getProps(props);
    if (this.type === 'Unknown') {
      this.type = (node ? GObject.typeName(node.__gtype__ as unknown as GObject.GType) : 'Virtual') || 'Unknown';
    }
    this.id = `${this.type}-${Math.random().toString(36).substring(2, 9)}`;
    this.node = node;
    if (this.node) {
      this.node._element = this as unknown as Instance;
      this.styleContext = this.node.getStyleContext();
      this.styleContext.addClass(this.id);
    }
  }

  defer(operation: DeferredOperation) {
    if (this.reconcilePhase === ReconcilePhase.Commit) {
      logger.warn('cannot defer during commit reconcile phase');
    } else if (this.reconcilePhase === ReconcilePhase.Render) {
      this.deferredOperations.push(operation);
    }
  }

  appendChild(child: Instance) {
    child.setParent(this as Instance);
    this.children.push(child);
    if (!this.mounted) child.willMount();
    child.defer(() => {
      this.packChild(child);
    });
  }

  setParent(parent: Instance) {
    this.parent = parent;
  }

  removeChild(child: Instance) {
    child.willUnmount();
    child.mounted = false;
    this.unpackChild(child);
    child.didUnmount();
    this.children.splice(this.children.indexOf(child), 1);
    delete child.parent;
  }

  removeAllChildren() {
    const children = [...this.children];
    this.children = [];
    children.forEach((child) => {
      this.removeChild(child);
    });
  }

  commitMount(_newProps: Props) {
    this.mounted = true;
    this.reconcilePhase = ReconcilePhase.Commit;
    this.renderNode();
    this.executeDeferredOperations();
    this.didMount();
  }

  prepareUpdate(changes: Changes, newProps: Props, _oldProps: Props) {
    this.reconcilePhase = ReconcilePhase.Render;
    this.props = {
      ...this.props,
      ...newProps,
    };
    this.willUpdate(changes);
  }

  commitUpdate(changes: Changes, _newProps: Props, _oldProps: Props) {
    this.reconcilePhase = ReconcilePhase.Commit;
    this.renderNode(changes);
    this.executeDeferredOperations();
    this.didUpdate(changes);
  }

  insertBefore(child: Instance | TextInstance, beforeChild: Instance | TextInstance) {
    child.setParent(this as Instance);
    const index = this.children.indexOf(beforeChild as Instance);
    if (index > -1) {
      this.children.splice(index, 0, child);
    } else {
      this.children.push(child);
    }
    if (!this.mounted) child.willMount();
    this.packChild(child);
  }

  packChild(child: Instance, beforeChild?: Instance | TextInstance) {
    this.autoPackChild(child, beforeChild);
  }

  unpackChild(child: Instance) {
    this.autoUnpackChild(child);
  }

  renderNode(_changes?: Changes) {
    if (!this.node) return;
    Object.keys(this.props).forEach((key: string) => {
      const value = this.props[key];
      if (typeof value !== 'undefined' && value !== null) {
        if (key === 'style') {
          this.setStyle(value);
        } else if (key === 'userStyle') {
          this.setStyle(value, Gtk.STYLE_PROVIDER_PRIORITY_USER);
        } else if (key === 'fallbackStyle') {
          this.setStyle(value, Gtk.STYLE_PROVIDER_PRIORITY_FALLBACK);
        } else if (/^on[A-Z]/.test(key)) {
          const signal = kebabCase(key.slice(2));
          try {
            if (signal in this.connectedSignals) this.node!.disconnect(this.connectedSignals[signal]);
            this.connectedSignals[signal] = this.node!.connect(signal, value);
          } catch (err) {
            const error = err as Error;
            if (error.toString().indexOf('TypeError: Signal name is invalid') <= -1) throw err;
            logger.warn(`signal ${signal} is not available on ${this.type}`);
          }
        } else if (key in this.node!) {
          switch (key) {
            case 'className': {
              if (this.styleContext) {
                [...this.classNames].forEach((className: string) => {
                  this.styleContext?.removeClass(className);
                });
                this.classNames = new Set();
                (Array.isArray(value) ? value : value.toString().split(' ')).forEach((className: string) => {
                  if (typeof className !== 'string') return;
                  this.styleContext?.addClass(className);
                  this.classNames.add(className);
                });
              }
              return;
            }
            case 'class': {
              return;
            }
            default: {
              const node = this.node as any;
              node[key] = value;
            }
          }
        } else if (Array.isArray(value)) {
          if (key === 'sizeRequest') return;
          const node = this.node as any;
          key = `set${key[0].toUpperCase() + key.slice(1)}`;
          if (key in node && typeof node[key] === 'function') {
            node[key](...value);
          }
        }
      }
    });
    const { width, height } = this;
    if (width > -1 || height > -1) {
      this.node.setSizeRequest(width, height);
    }
  }

  get propertyList(): string[] {
    if (_propertyList) return _propertyList;
    let prototype = Object.getPrototypeOf(this.node);
    let propertyList: string[] = [];
    while (prototype) {
      propertyList = [
        ...propertyList,
        ...Object.getOwnPropertyNames(prototype).map((name) => {
          if (!/^set[A-Z]/.test(name)) return '';
          return name.replace(/^set([A-Z])/, (_, match) => match.toLowerCase());
        }),
      ].filter((key) => key.length);
      prototype = Object.getPrototypeOf(prototype);
    }
    _propertyList = propertyList;
    return _propertyList;
  }

  get availableSignals(): Set<string> {
    if (_availableSignals) return _availableSignals;
    _availableSignals = new Set();
    let gtype = this.node?.__gtype__ as unknown as GObject.GType;
    while (gtype) {
      const signalIds = GObject.signalListIds(gtype);
      for (const id of signalIds) {
        const signalName = GObject.signalName(id);
        if (signalName) _availableSignals.add(signalName);
      }
      gtype = GObject.typeParent(gtype);
    }
    return _availableSignals;
  }

  get css() {
    return Object.keys(this.cssBlocks)
      .map((key) => Number(key))
      .reduce((css: string[], key: number) => {
        const cssBlocks = this.cssBlocks[key];
        css.push(cssBlocks.join('\n'));
        return css;
      }, []);
  }

  willMount() {
    return;
  }

  willUpdate(_changes: Changes) {
    return;
  }

  willUnmount() {
    return;
  }

  didMount() {
    return;
  }

  didUpdate(_changes: Changes) {
    return;
  }

  didUnmount() {
    return;
  }

  protected get width() {
    const style = this.props.style || {};
    if (typeof this.props.sizeRequest?.[0] !== 'undefined') return this.props.sizeRequest[0];
    return Math.max(
      typeof style.width === 'undefined' || style.width === 'auto'
        ? -1
        : parseDimension(style.width as DimensionValue, false, false) || -1,
      typeof style.minWidth === 'undefined' || style.minWidth === 'auto'
        ? -1
        : parseDimension(style.minWidth as DimensionValue, false, false) || -1,
    );
  }

  protected get height() {
    const style = this.props.style || {};
    if (typeof this.props.sizeRequest?.[1] !== 'undefined') return this.props.sizeRequest[1];
    return Math.max(
      typeof style.height === 'undefined' || style.height === 'auto'
        ? -1
        : parseDimension(style.height as DimensionValue, false, false) || -1,
      typeof style.minHeight === 'undefined' || style.minHeight === 'auto'
        ? -1
        : parseDimension(style.minHeight as DimensionValue, false, false) || -1,
    );
  }

  get estimatedWidth() {
    const { width } = this;
    if (width > -1) return width;
    return this.parent?.estimatedWidth;
  }

  get estimatedHeight() {
    const { height } = this;
    if (height > -1) return height;
    return this.parent?.estimatedHeight;
  }

  protected setStyle(
    style: Record<string, string | number | null>,
    priority = Gtk.STYLE_PROVIDER_PRIORITY_APPLICATION,
  ) {
    return this.setGtkStyle(style, priority);
  }

  protected setGtkStyle(
    style: Record<string, string | number | null>,
    priority = Gtk.STYLE_PROVIDER_PRIORITY_APPLICATION,
  ) {
    if (!this.node || !this.styleContext || typeof style !== 'object') return;
    const cssProvider = new Gtk.CssProvider();
    const cssDeclarations: string[] = [];
    const cssBlocks: string[] = [];
    Object.entries(style).forEach(
      ([key, value]: [string, string | number | null | Record<string, string | number | null>]) => {
        if (key?.[0] === '&') {
          if (psuedoClasses.has(key) && typeof value === 'object') {
            const cssDeclarations: string[] = [];
            Object.entries(value as Record<string, string | number | null>).forEach(
              ([psuedoKey, psuedoValue]: [string, string | number | null]) => {
                cssDeclarations.push(
                  buildCssDeclaration(value as Record<string, string | number | null>, psuedoKey, psuedoValue),
                );
              },
            );
            cssBlocks.push(`.${this.id}${key.split('&')[1]} {\n${cssDeclarations.join('\n')}\n}`);
          }
          return;
        }
        if (typeof value !== 'object') cssDeclarations.push(buildCssDeclaration(style, key, value));
      },
    );
    cssBlocks.push(`.${this.id} {\n${cssDeclarations.join('\n')}\n}`);
    this.cssBlocks[priority] = cssBlocks;
    const css = cssBlocks.join('\n');
    try {
      cssProvider.loadFromData(css, css.length);
      this.styleContext.addProvider(cssProvider, priority);
    } catch (err) {
      logger.warn(err);
    }
  }

  protected getProps(props: Props): Props {
    props = { ...this.props, ...props };
    const { defaultProps, propTypes } = this.constructor as typeof Element;
    Object.keys(defaultProps).forEach((key) => {
      const defaultProp = defaultProps[key];
      if (typeof props[key] === 'undefined' || props[key] === null) {
        (props as Record<string, any>)[key] = defaultProp;
      }
    });
    PropTypes.checkPropTypes(propTypes, props, 'prop', this.constructor.name);
    return props;
  }

  protected autoPackChild(child: Instance, _beforeChild?: Instance | TextInstance) {
    const node = this.node as any;
    if (
      'append' in node &&
      typeof node.append === 'function' &&
      'remove' in node &&
      typeof node.remove === 'function'
    ) {
      node.append(child.node);
    } else if ('addChild' in node && typeof node.addChild === 'function') {
      node.addChild(child.node);
    } else if (
      'appendPage' in node &&
      typeof node.appendPage === 'function' &&
      'removePage' in node &&
      typeof node.removePage === 'function'
    ) {
      node.appendPage(child.node);
    } else if ('setChild' in node && typeof node.setChild === 'function') {
      node.setChild(child.node);
    } else {
      logger.warn(`widget ${this.type} does not support children`);
    }
  }

  protected autoUnpackChild(child: Instance) {
    const node = this.node as any;
    if (
      'append' in node &&
      typeof node.append === 'function' &&
      'remove' in node &&
      typeof node.remove === 'function'
    ) {
      node.remove(child.node);
    } else if ('addChild' in node && typeof node.addChild === 'function') {
      node.addChild(child.node);
    } else if (
      'appendPage' in node &&
      typeof node.appendPage === 'function' &&
      'removePage' in node &&
      typeof node.removePage === 'function'
    ) {
      node.removePage(child.node, -1); // TODO: get the page id of the child
    } else if ('setChild' in node && typeof node.setChild === 'function') {
      node.setChild(null);
    } else {
      logger.warn(`widget ${this.type} does not support children`);
    }
  }

  private executeDeferredOperations() {
    this.deferredOperations.forEach((operation: DeferredOperation) => {
      operation();
    });
    this.deferredOperations = [];
  }
}
