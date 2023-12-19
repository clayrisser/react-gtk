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
import Yoga, { Node as YogaNode } from 'yoga-layout/wasm-sync';
import type { FlexStyle } from 'react-native';
import type { ReactNode, Ref } from 'react';
import { AppendChildOptions, Instance, YogaInstance } from '../types';
import { Element } from './Element';
import { FlexEdge } from './FlexEdge';
import { StyleProp, StyleProps } from '../style';
import { parseSize } from '../util';

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

export class FlexBox extends Element implements YogaInstance {
  node: Gtk.Fixed;
  yogaNode = Yoga.Node.create();
  yogaChildren: YogaNode[] = [];

  constructor(props: FlexBoxProps) {
    const node = new Gtk.Fixed();
    super(node, props, {
      appendChild: async (child: Instance, _options: AppendChildOptions) => {
        const yogaChild = child as YogaInstance;
        if (!yogaChild.node || !yogaChild.yogaNode) return;
        const width = parseSize(props.style?.width);
        const height = parseSize(props.style?.height);
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
      },
      prepareUnmount: () => {
        this.yogaNode.freeRecursive();
      },
    });
    this.node = node;
    const width = parseSize(props.style?.width);
    const height = parseSize(props.style?.height);
    if (typeof width !== 'undefined') this.yogaNode.setWidth(width);
    if (typeof height !== 'undefined') this.yogaNode.setHeight(height);
    this.yogaNode.calculateLayout(width as number, height as number, Yoga.DIRECTION_LTR);
    const { width: computedWidth, height: computedHeight } = this.yogaNode.getComputedLayout();
    console.log('W', computedWidth);
    console.log('H', computedHeight);
    this.node.setSizeRequest(computedWidth, computedHeight);
  }

  appendChild(child: Instance, options?: Partial<AppendChildOptions>): void {
    let yogaChild = child as YogaInstance;
    if (!yogaChild.yogaNode) {
      const flexEdge = new FlexEdge({
        style: {
          width: '100%',
          height: '100%',
          backgroundColor: 'orange',
        },
      });
      flexEdge.appendChild(child);
      yogaChild = flexEdge;
    }
    this.yogaChildren.push(yogaChild.yogaNode);
    this.yogaNode.insertChild(yogaChild.yogaNode, this.yogaChildren.length - 1);
    return super.appendChild(yogaChild, options);
  }
}
