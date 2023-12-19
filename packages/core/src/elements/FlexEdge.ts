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
import { Instance, YogaInstance } from '../types';
import { StyleProp, StyleProps } from '../style';
import { FlexStyle } from 'react-native';
import { parseSize } from '../util';

export interface FlexEdgeProps extends Omit<StyleProps, 'style'> {
  children?: ReactNode;
  ref?: Ref<Instance>;
  style?: StyleProp & FlexStyle;
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

export class FlexEdge extends Element implements YogaInstance {
  node: Gtk.Box;
  yogaNode = Yoga.Node.create();

  constructor(props: FlexEdgeProps) {
    const node = new Gtk.Box();
    super(
      node,
      {
        hexpand: true,
        vexpand: true,
        ...props,
      },
      {
        prepareUnmount: () => {
          this.yogaNode.freeRecursive();
        },
      },
    );
    this.node = node;
    // const width = parseSize(props.style?.width);
    // const height = parseSize(props.style?.height);
    // if (typeof width !== 'undefined') this.yogaNode.setWidth(width);
    // if (typeof height !== 'undefined') this.yogaNode.setHeight(height);
    // const { width: computedWidth, height: computedHeight } = this.yogaNode.getComputedLayout();
    // this.node.setSizeRequest(computedWidth, computedHeight);
  }
}
