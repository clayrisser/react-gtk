/*
 *  File: /src/elements/FlexEdge.ts
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

import GObject from '@girs/node-gobject-2.0';
import Gtk from '@girs/node-gtk-4.0';
import Yoga from 'yoga-layout/sync';
import type { BoxProps } from '../generated/elements/Box';
import type { Ref } from 'react';
import { Changes, Instance, YogaInstance } from '../types';
import { Element } from './Element';
import { FlexRoot } from './FlexRoot';
import { FlexStyle } from 'react-native';
import { StyleProp, StyleProps } from '../style';
import { YogaStyle, lookupAlign, lookupPosition, parseDimension } from '../yoga';

export interface FlexEdgeProps extends Omit<StyleProps, 'style'>, Omit<BoxProps, 'ref' | 'style'> {
  ref?: Ref<Instance>;
  style?: Omit<StyleProp, 'minWidth' | 'minHeight' | 'width' | 'height'> &
    Omit<
      FlexStyle,
      | 'flexDirection'
      | 'justifyContent'
      | 'flexWrap'
      | 'alignItems'
      | 'alignContent'
      | 'overflow'
      | 'flexBasis'
      | 'flexGrow'
      | 'flexShrink'
    >;
  hexpand?: boolean;
  vexpand?: boolean;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      FlexEdge: FlexEdgeProps;
    }
  }
}

export class FlexEdge extends Element<Gtk.Box, FlexEdgeProps> implements YogaInstance {
  yogaNode = Yoga.Node.create();
  yogaParent?: YogaInstance;
  yogaRoot?: FlexRoot;
  type = 'FlexEdge';

  private yogaStyle: YogaStyle = {};

  constructor(props: FlexEdgeProps) {
    super(new Gtk.Box(), props);
    this.updateYogaNode();
  }

  setParent(parent: Instance): void {
    if (parent.type !== 'FlexBox' && parent.type !== 'FlexRoot') {
      throw new Error('FlexEdge can only be a child of FlexBox or FlexRoot');
    }
    return super.setParent(parent);
  }

  willUnmount() {
    this.yogaNode.freeRecursive();
    return super.willUnmount();
  }

  renderNode() {
    this.updateYogaNode();
    super.renderNode();
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
      if (!parentNode || GObject.typeName(parentNode.__gtype__ as unknown as GObject.GType) !== 'ReactGtkFixed') {
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
      width: parseDimension(style?.width),
      height: parseDimension(style?.height),
      maxWidth: parseDimension(style?.maxWidth, false),
      minWidth: parseDimension(style?.minWidth, false),
      maxHeight: parseDimension(style?.maxHeight, false),
      minHeight: parseDimension(style?.minHeight, false),
      alignSelf: lookupAlign(style?.alignSelf),
      position: lookupPosition(style?.position),
    };
    if (typeof this.yogaStyle.width !== 'undefined') this.yogaNode.setWidth(this.yogaStyle.width);
    if (typeof this.yogaStyle.height !== 'undefined') this.yogaNode.setHeight(this.yogaStyle.height);
    if (typeof this.yogaStyle.maxWidth !== 'undefined') this.yogaNode.setMaxWidth(this.yogaStyle.maxWidth);
    if (typeof this.yogaStyle.minWidth !== 'undefined') this.yogaNode.setMinWidth(this.yogaStyle.minWidth);
    if (typeof this.yogaStyle.minHeight !== 'undefined') this.yogaNode.setMinHeight(this.yogaStyle.minHeight);
    if (typeof this.yogaStyle.maxHeight !== 'undefined') this.yogaNode.setMaxHeight(this.yogaStyle.maxHeight);
    if (typeof this.yogaStyle.alignSelf !== 'undefined') this.yogaNode.setAlignSelf(this.yogaStyle.alignSelf);
    if (typeof this.yogaStyle.position !== 'undefined') this.yogaNode.setPositionType(this.yogaStyle.position);
  }

  protected get width() {
    return this.layout.width;
  }

  protected get height() {
    return this.layout.height;
  }
}
