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

import Gtk from '@girs/node-gtk-4.0';
import Yoga from 'yoga-layout/wasm-sync';
import type { ReactNode, Ref } from 'react';
import { Element } from './Element';
import { FlexStyle } from 'react-native';
import { Changes, Instance, YogaInstance } from '../types';
import { StyleProp, StyleProps } from '../style';
import { YogaStyle, lookupAlign, lookupPosition, parseDimension, setYogaRoot } from '../yoga';

export interface FlexEdgeProps extends Omit<StyleProps, 'style'> {
  children?: ReactNode;
  ref?: Ref<Instance>;
  style?: StyleProp &
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
  yogaRoot?: YogaInstance;
  type = 'FlexEdge';

  private yogaStyle: YogaStyle = {};

  constructor(props: FlexEdgeProps) {
    super(new Gtk.Box(), {
      hexpand: true,
      vexpand: true,
      ...props,
    });
    this.updateYogaNode();
  }

  prepareUnmount() {
    this.yogaNode.freeRecursive();
    return super.prepareUnmount();
  }

  renderNode() {
    this.updateYogaNode();
    super.renderNode();
  }

  willMount() {
    const parent = this.parent as YogaInstance;
    if (!parent.yogaNode) {
      setYogaRoot(this);
      this.calculateLayout();
    }
    this.updateYogaNode();
    return super.willMount();
  }

  willUpdate(changes: Changes) {
    this.updateYogaNode();
    this.calculateLayout();
    return super.willUpdate(changes);
  }

  get layout() {
    return this.yogaNode.getComputedLayout();
  }

  private calculateLayout() {
    this.yogaRoot?.yogaNode.calculateLayout(
      this.yogaRoot.estimatedWidth,
      this.yogaRoot.estimatedHeight,
      Yoga.DIRECTION_LTR,
    );
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
}
