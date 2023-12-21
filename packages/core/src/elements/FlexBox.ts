/*
 *  File: /src/elements/FlexBox.ts
 *  Project: @react-gtk/core
 *  File Created: 28-11-2023 23:41:23
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

import Gtk from '@girs/node-gtk-4.0';
import Yoga from 'yoga-layout/wasm-sync';
import type { FlexStyle } from 'react-native';
import type { ReactNode, Ref } from 'react';
import { Changes, Instance, PublicInstance, TextInstance, YogaInstance } from '../types';
import { Element } from './Element';
import { FlexRoot } from './FlexRoot';
import { StyleProp, StyleProps } from '../style';
import {
  YogaStyle,
  lookupAlign,
  lookupFlexDirection,
  lookupFlexWrap,
  lookupJustify,
  lookupOverflow,
  lookupPosition,
  parseDimension,
} from '../yoga';
import GObject from '@girs/node-gobject-2.0';
import { FlexRoot as FlexBoxWidget } from '../widgets/FlexRoot';

export interface FlexBoxProps extends Omit<StyleProps, 'style'> {
  children?: ReactNode;
  ref?: Ref<PublicInstance<FlexBoxWidget>>;
  sizeRequest?: [number, number];
  style?: Omit<StyleProp, 'minWidth' | 'minHeight' | 'width' | 'height'> & FlexStyle;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      FlexBox: FlexBoxProps;
    }
  }
}

export class FlexBox extends Element<FlexBoxWidget, FlexBoxProps> implements YogaInstance {
  yogaChildren: YogaInstance[] = [];
  yogaNode = Yoga.Node.create();
  yogaParent?: YogaInstance;
  yogaRoot?: FlexRoot;
  type = 'FlexBox';

  private yogaStyle: YogaStyle = {};

  constructor(props: FlexBoxProps) {
    super(new FlexBoxWidget(), props);
    this.node.hexpand = false;
    this.node.vexpand = false;
  }

  appendChild(child: Instance): void {
    let yogaChild = child as YogaInstance;
    if (!yogaChild.yogaNode) throw new Error(`${child.type} cannot be a child of ${this.type}`);
    yogaChild.yogaParent = this;
    this.yogaChildren.push(yogaChild);
    this.yogaNode.insertChild(yogaChild.yogaNode, this.yogaChildren.length - 1);
    return super.appendChild(yogaChild);
  }

  setParent(parent: Instance): void {
    if (parent.type !== 'FlexBox' && parent.type !== 'FlexRoot') {
      throw new Error('FlexBox can only be a child of FlexBox or FlexRoot');
    }
    return super.setParent(parent);
  }

  insertBefore(child: Instance | TextInstance, beforeChild: Instance | TextInstance) {
    let yogaChild = child as YogaInstance;
    if (!yogaChild.yogaNode) throw new Error(`${child.type} cannot be a child of ${this.type}`);
    yogaChild.yogaParent = this;
    const index = this.children.indexOf(beforeChild as Instance);
    if (index > -1 && index < this.yogaChildren.length) {
      this.yogaChildren.splice(index, 0, yogaChild);
    } else {
      this.yogaChildren.push(yogaChild);
    }
    this.yogaNode.insertChild(yogaChild.yogaNode, index);
    return super.insertBefore(child, beforeChild);
  }

  removeChild(child: Instance) {
    const index = this.children.indexOf(child);
    if (index > -1 && index < this.yogaChildren.length) this.yogaChildren.splice(index, 1);
    delete this.yogaParent;
    return super.removeChild(child);
  }

  packChild(child: Instance, _beforeChild?: Instance | TextInstance): void {
    if (!child.node) return;
    const yogaChild = child as YogaInstance;
    const { left, top } = yogaChild.renderYoga() || {};
    if (typeof left === 'undefined' || typeof top === 'undefined') return;
    this.node.put(child.node, left, top);
  }

  willUnmount() {
    this.yogaNode.freeRecursive();
    return super.willUnmount();
  }

  willMount() {
    this.updateYogaNode();
    return super.willMount();
  }

  willUpdate(changes: Changes) {
    this.updateYogaNode();
    this.yogaRoot?.calculateLayout();
    return super.willUpdate(changes);
  }

  renderYoga() {
    if (!this.node) return;
    const layout = this.layout;
    if (!layout) return;
    const { left, top, width, height } = layout;
    if (
      typeof width === 'undefined' ||
      typeof height === 'undefined' ||
      typeof left === 'undefined' ||
      typeof top === 'undefined'
    ) {
      return;
    }
    this.node.setSizeRequest(width, height);
    if (this.node?.parent) {
      const parentNode = this.node.parent as Gtk.Fixed;
      if (parentNode && GObject.typeName(parentNode.__gtype__ as unknown as GObject.GType) === 'GtkFixed') {
        parentNode.move(this.node, left, top);
      }
    }
    return layout;
  }

  get layout() {
    return this.yogaNode.getComputedLayout();
  }

  private updateYogaNode() {
    const { style } = this.props;
    this.yogaStyle = {
      alignContent: lookupAlign(style?.alignContent, false),
      alignItems: lookupAlign(style?.alignItems),
      alignSelf: lookupAlign(style?.alignSelf),
      flex: style?.flex,
      flexBasis: parseDimension(style?.flexBasis, false, false),
      flexDirection: lookupFlexDirection(style?.flexDirection),
      flexGrow: style?.flexGrow,
      flexShrink: style?.flexShrink,
      flexWrap: lookupFlexWrap(style?.flexWrap),
      height: parseDimension(style?.height),
      justifyContent: lookupJustify(style?.justifyContent),
      maxHeight: parseDimension(style?.maxHeight, false),
      maxWidth: parseDimension(style?.maxWidth, false),
      minHeight: parseDimension(style?.minHeight, false),
      minWidth: parseDimension(style?.minWidth, false),
      overflow: lookupOverflow(style?.overflow),
      position: lookupPosition(style?.position),
      width: parseDimension(style?.width),
    };
    if (typeof this.yogaStyle.alignContent !== 'undefined') this.yogaNode.setAlignContent(this.yogaStyle.alignContent);
    if (typeof this.yogaStyle.alignItems !== 'undefined') this.yogaNode.setAlignItems(this.yogaStyle.alignItems);
    if (typeof this.yogaStyle.alignSelf !== 'undefined') this.yogaNode.setAlignSelf(this.yogaStyle.alignSelf);
    if (typeof this.yogaStyle.flex !== 'undefined') this.yogaNode.setFlex(this.yogaStyle.flex);
    if (typeof this.yogaStyle.flexBasis !== 'undefined') this.yogaNode.setFlexBasis(this.yogaStyle.flexBasis);
    if (typeof this.yogaStyle.flexGrow !== 'undefined') this.yogaNode.setFlexGrow(this.yogaStyle.flexGrow);
    if (typeof this.yogaStyle.flexShrink !== 'undefined') this.yogaNode.setFlexShrink(this.yogaStyle.flexShrink);
    if (typeof this.yogaStyle.flexWrap !== 'undefined') this.yogaNode.setFlexWrap(this.yogaStyle.flexWrap);
    if (typeof this.yogaStyle.height !== 'undefined') this.yogaNode.setHeight(this.yogaStyle.height);
    if (typeof this.yogaStyle.maxHeight !== 'undefined') this.yogaNode.setMaxHeight(this.yogaStyle.maxHeight);
    if (typeof this.yogaStyle.maxWidth !== 'undefined') this.yogaNode.setMaxWidth(this.yogaStyle.maxWidth);
    if (typeof this.yogaStyle.minHeight !== 'undefined') this.yogaNode.setMinHeight(this.yogaStyle.minHeight);
    if (typeof this.yogaStyle.minWidth !== 'undefined') this.yogaNode.setMinWidth(this.yogaStyle.minWidth);
    if (typeof this.yogaStyle.overflow !== 'undefined') this.yogaNode.setOverflow(this.yogaStyle.overflow);
    if (typeof this.yogaStyle.position !== 'undefined') this.yogaNode.setPositionType(this.yogaStyle.position);
    if (typeof this.yogaStyle.width !== 'undefined') this.yogaNode.setWidth(this.yogaStyle.width);
    if (typeof this.yogaStyle.flexDirection !== 'undefined') {
      this.yogaNode.setFlexDirection(this.yogaStyle.flexDirection);
    }
    if (typeof this.yogaStyle.justifyContent !== 'undefined') {
      this.yogaNode.setJustifyContent(this.yogaStyle.justifyContent);
    }
  }

  protected get width() {
    return this.layout.width;
  }

  protected get height() {
    return this.layout.height;
  }
}
