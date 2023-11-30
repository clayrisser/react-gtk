/*
 *  File: /src/elements/Element.ts
 *  Project: @react-gtk/core
 *  File Created: 28-11-2023 22:32:06
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
import PropTypes from 'prop-types';
import type Gtk from '@girs/node-gtk-4.0';
import { Instance, GtkNode, Props, ElementMeta } from '../types';

let _propertyList: string[] | undefined;
let _signalList: Set<string> | undefined;

export class Element implements Instance {
  static defaultProps: Props = {};

  static propTypes: object = {};

  props: Props;

  children: Instance[] = [];

  constructor(
    public node: GtkNode,
    props: Props = {},
    private meta: ElementMeta = {},
  ) {
    this.props = this.getProps(props);
    this.node._element = this;
  }

  appendChild(child: Instance) {
    this.updateNode();
    this.children.push(child);
    if (this.meta.appendChild) {
      this.meta.appendChild(child.node);
    } else if ('setChild' in this.node && typeof this.node.setChild === 'function') {
      (
        this.node as {
          setChild: (child: Gtk.Widget | null) => void;
        }
      ).setChild(child.node);
    }
  }

  removeChild(child: Instance) {
    this.updateNode();
    this.children.splice(this.children.indexOf(child), 1);
    if (this.meta.removeChild) {
      this.meta.removeChild(child.node);
    } else if ('setChild' in this.node && typeof this.node.setChild === 'function') {
      (
        this.node as {
          setChild: (child: Gtk.Widget | null) => void;
        }
      ).setChild(null);
    }
  }

  commitMount() {
    this.updateNode();
  }

  commitUpdate(newProps: Props) {
    this.props = {
      ...this.props,
      ...newProps,
    };
    this.updateNode();
  }

  updateNode() {
    Object.keys(this.props).forEach((key: string) => {
      const prop = this.props[key];
      if (typeof prop !== 'undefined' && prop !== null) {
        if (/^on[A-Z]/.test(key)) {
          const signal = key.replace(/^on([A-Z])/, (_, match) => match.toLowerCase());
          if (this.signalList.has(signal)) this.node.connect(signal, prop);
        } else if (key in this.node) {
          (this.node as any)[key] = prop;
        }
      }
    });
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

  get signalList(): Set<string> {
    if (_signalList) return _signalList;
    _signalList = new Set(
      GObject.signalListIds(this.node.__gtype__ as unknown as GObject.GType)
        .map((id: number) => GObject.signalName(id))
        .filter((name: string | null) => name?.length) as string[],
    );
    return _signalList;
  }

  private getProps(props: Props): Props {
    props = { ...this.props, ...props };
    const { defaultProps, propTypes } = this.constructor as typeof Element;
    Object.keys(defaultProps).forEach((key) => {
      const defaultProp = defaultProps[key];
      if (typeof props[key] === 'undefined' || props[key] === null) {
        props[key] = defaultProp;
      }
    });
    PropTypes.checkPropTypes(propTypes, props, 'prop', this.constructor.name);
    return props;
  }
}
