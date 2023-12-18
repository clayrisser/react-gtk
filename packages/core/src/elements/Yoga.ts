/*
 *  File: /src/elements/Yoga.ts
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
import Y, { Node as YogaNode } from 'yoga-layout/wasm-sync';
import type { ReactNode, Ref } from 'react';
import { AppendChildOptions, Instance } from '../types';
import { Element } from './Element';
import { StyleProps } from '../style';

export interface YogaProps extends StyleProps {
  children?: ReactNode;
  ref?: Ref<Instance>;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      Yoga: YogaProps;
    }
  }
}

export class Yoga extends Element {
  node: Gtk.Fixed;
  yogaChildren: YogaNode[] = [];

  constructor(props: YogaProps) {
    const node = new Gtk.Fixed();
    super(node, props, {
      appendChild: async (child: Instance, _options: AppendChildOptions) => {
        this.yogaNode.setWidth(500);
        this.yogaNode.setHeight(300);
        this.yogaNode.setJustifyContent(Y.JUSTIFY_CENTER);
        this.yogaNode.setFlexDirection(Y.FLEX_DIRECTION_ROW);
        if (!child.node) return;
        this.yogaChildren.push(child.yogaNode);
        this.yogaNode.insertChild(child.yogaNode, this.yogaChildren.length - 1);
        this.yogaNode.calculateLayout(500, 300, Y.DIRECTION_LTR);
        const { left, top } = this.yogaNode.getComputedLayout();
        console.log({ left, top });
        this.node.put(child.node, left, top);
      },
      prepareUnmount: () => {
        this.yogaNode.freeRecursive();
      },
    });
    this.node = node;
  }
}
