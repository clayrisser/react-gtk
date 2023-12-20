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
import debounce from 'lodash.debounce';
import type { FlexStyle } from 'react-native';
import type { ReactNode, Ref } from 'react';
import { Element } from './Element';
import { FlexEdge } from './FlexEdge';
import { Instance, TextInstance, YogaInstance } from '../types';
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

export interface FlexBoxProps extends Omit<StyleProps, 'style'> {
  children?: ReactNode;
  ref?: Ref<Instance>;
  style?: StyleProp & FlexStyle;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      FlexBox: FlexBoxProps;
    }
  }
}

export class FlexBox extends Element<Gtk.Fixed, FlexBoxProps> implements YogaInstance {
  yogaChildren: YogaInstance[] = [];
  yogaNode = Yoga.Node.create();
  yogaParent?: YogaInstance;

  _debouncedCalculateLayout: () => void;

  private _yogaRoot?: YogaInstance;

  private yogaStyle: YogaStyle = {};

  constructor(props: FlexBoxProps) {
    super(new Gtk.Fixed(), props);
    // this.updateYogaNode();
    this._debouncedCalculateLayout = debounce(() => {
      this.calculateLayout();
    }, 100);
  }

  appendChild(child: Instance): void {
    let yogaChild = child as YogaInstance;
    if (!yogaChild.yogaNode) {
      const flexEdge = new FlexEdge({
        style: {
          width: '100%',
          height: '100%',
        },
      });
      flexEdge.appendChild(child);
      yogaChild = flexEdge;
    }
    yogaChild.yogaParent = this;
    this.yogaChildren.push(yogaChild);
    this.yogaNode.insertChild(yogaChild.yogaNode, this.yogaChildren.length - 1);
    return super.appendChild(yogaChild);
  }

  insertBefore(child: Instance | TextInstance, beforeChild: Instance | TextInstance) {
    let yogaChild = child as YogaInstance;
    if (!yogaChild.yogaNode) {
      const flexEdge = new FlexEdge({
        style: {
          width: '100%',
          height: '100%',
        },
      });
      flexEdge.appendChild(child);
      yogaChild = flexEdge;
    }
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
    const yogaChild = child as YogaInstance;
    if (!yogaChild.node || !yogaChild.yogaNode) return;
    const width = parseDimension(this.props.style?.width);
    const height = parseDimension(this.props.style?.height);
    this.yogaNode.calculateLayout(width as number, height as number, Yoga.DIRECTION_LTR);
    const { width: calculatedWidth, height: calculatedHeight } = this.yogaNode.getComputedLayout();
    this.node.setSizeRequest(calculatedWidth, calculatedHeight);
    const {
      left: childLeft,
      top: childTop,
      width: childWidth,
      height: childHeight,
    } = yogaChild.yogaNode.getComputedLayout();
    yogaChild.node.setSizeRequest(childWidth, childHeight);
    this.node.put(yogaChild.node, childLeft, childTop);
  }

  willUnmount() {
    this.yogaNode.freeRecursive();
    return super.prepareUnmount();
  }

  willMount() {
    this.updateYogaNode();
  }

  renderNode() {
    this.rootCalculateLayout();
    return super.renderNode();
  }

  get yogaRoot() {
    if (this._yogaRoot) return this._yogaRoot;
    const parent = this.parent as YogaInstance;
    const yogaRoot = parent.yogaNode ? parent.yogaRoot : (this as YogaInstance);
    this._yogaRoot = yogaRoot;
    return yogaRoot;
  }

  private get layout() {
    return this.yogaNode.getComputedLayout();
  }

  rootCalculateLayout() {
    console.log('R');
    this.yogaRoot._debouncedCalculateLayout();
  }

  private calculateLayout() {
    console.log('CALC LAYOUT');
    this.yogaRoot.yogaNode.calculateLayout(
      this.yogaRoot.estimatedWidth,
      this.yogaRoot.estimatedHeight,
      Yoga.DIRECTION_LTR,
    );
  }

  private updateYogaNode() {
    console.log('UPDATE YOGA NODE');
    const { style } = this.props;
    this.yogaStyle = {
      width: parseDimension(style?.width),
      height: parseDimension(style?.height),
      maxWidth: parseDimension(style?.maxWidth, false),
      minWidth: parseDimension(style?.minWidth, false),
      maxHeight: parseDimension(style?.maxHeight, false),
      minHeight: parseDimension(style?.minHeight, false),
      flexDirection: lookupFlexDirection(style?.flexDirection),
      justifyContent: lookupJustify(style?.justifyContent),
      flexWrap: lookupFlexWrap(style?.flexWrap),
      alignItems: lookupAlign(style?.alignItems),
      alignSelf: lookupAlign(style?.alignSelf),
      alignContent: lookupAlign(style?.alignContent, false),
      position: lookupPosition(style?.position),
      overflow: lookupOverflow(style?.overflow),
      flex: style?.flex,
      flexBasis: parseDimension(style?.flexBasis, false, false),
      flexGrow: style?.flexGrow,
      flexShrink: style?.flexShrink,
    };
    if (typeof this.yogaStyle.width !== 'undefined') this.yogaNode.setWidth(this.yogaStyle.width);
    if (typeof this.yogaStyle.height !== 'undefined') this.yogaNode.setHeight(this.yogaStyle.height);
    if (typeof this.yogaStyle.maxWidth !== 'undefined') this.yogaNode.setMaxWidth(this.yogaStyle.maxWidth);
    if (typeof this.yogaStyle.minWidth !== 'undefined') this.yogaNode.setMinWidth(this.yogaStyle.minWidth);
    if (typeof this.yogaStyle.minHeight !== 'undefined') this.yogaNode.setMinHeight(this.yogaStyle.minHeight);
    if (typeof this.yogaStyle.maxHeight !== 'undefined') this.yogaNode.setMaxHeight(this.yogaStyle.maxHeight);
    if (typeof this.yogaStyle.flexWrap !== 'undefined') this.yogaNode.setFlexWrap(this.yogaStyle.flexWrap);
    if (typeof this.yogaStyle.alignItems !== 'undefined') this.yogaNode.setAlignItems(this.yogaStyle.alignItems);
    if (typeof this.yogaStyle.alignSelf !== 'undefined') this.yogaNode.setAlignSelf(this.yogaStyle.alignSelf);
    if (typeof this.yogaStyle.alignContent !== 'undefined') this.yogaNode.setAlignContent(this.yogaStyle.alignContent);
    if (typeof this.yogaStyle.position !== 'undefined') this.yogaNode.setPositionType(this.yogaStyle.position);
    if (typeof this.yogaStyle.overflow !== 'undefined') this.yogaNode.setOverflow(this.yogaStyle.overflow);
    if (typeof this.yogaStyle.flex !== 'undefined') this.yogaNode.setFlex(this.yogaStyle.flex);
    if (typeof this.yogaStyle.flexBasis !== 'undefined') this.yogaNode.setFlexBasis(this.yogaStyle.flexBasis);
    if (typeof this.yogaStyle.flexGrow !== 'undefined') this.yogaNode.setFlexGrow(this.yogaStyle.flexGrow);
    if (typeof this.yogaStyle.flexShrink !== 'undefined') this.yogaNode.setFlexShrink(this.yogaStyle.flexShrink);
    if (typeof this.yogaStyle.flexDirection !== 'undefined') {
      this.yogaNode.setFlexDirection(this.yogaStyle.flexDirection);
    }
    if (typeof this.yogaStyle.justifyContent !== 'undefined') {
      this.yogaNode.setJustifyContent(this.yogaStyle.justifyContent);
    }
  }

  get estimatedWidth() {
    const { width } = this.yogaStyle;
    if (typeof width === 'number') return width;
    return this.parent?.estimatedWidth;
  }

  get estimatedHeight() {
    const { height } = this.yogaStyle;
    if (typeof height === 'number') return height;
    return this.parent?.estimatedHeight;
  }
}
