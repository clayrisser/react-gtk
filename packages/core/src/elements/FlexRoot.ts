/*
 *  File: /src/elements/FlexRoot.ts
 *  Project: @react-gtk/core
 *  File Created: 21-12-2023 04:36:05
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

import Yoga from 'yoga-layout/sync';
import { DimensionValue } from 'react-native';
import { FlexBox, FlexBoxProps } from './FlexBox';
import { Instance, YogaInstance } from '../types';
import { StyleProp } from '../style';
import { parseDimension } from '../yoga';

export interface FlexRootProps extends Omit<FlexBoxProps, 'style'> {
  style?: Omit<FlexBoxProps['style'], 'minWidth' | 'minHeight' | 'width' | 'height' | 'maxWidth' | 'maxHeight'> &
    StyleProp;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      FlexRoot: FlexRootProps;
    }
  }
}

export class FlexRoot extends FlexBox {
  type = 'FlexRoot';

  private connected: number[] = [];

  private allocatedSize?: [number, number];

  constructor(props: FlexRootProps) {
    super(props as FlexBoxProps);
    this.connected.push(
      this.node.connect('map', () => {
        let timeout: NodeJS.Timeout;
        const interval = setInterval(() => {
          const width = this.node.getAllocatedWidth();
          const height = this.node.getAllocatedHeight();
          console.log('200', width, height);
          if (width > 0 || height > 0) {
            clearInterval(interval);
            clearTimeout(timeout);
            this.allocatedSize = [width, height];
            this.rerenderYogaTree();
          }
        }, 200);
        timeout = setTimeout(() => {
          clearInterval(interval);
        }, 1000);
      }),
    );
  }

  setParent(parent: Instance): void {
    if (
      parent.type === 'FlexBox' ||
      parent.type === 'FlexEdge' ||
      parent.type === 'FlexRoot' ||
      (parent as YogaInstance).yogaNode
    ) {
      throw new Error(`${this.type} cannot be a child of ${parent.type}`);
    }
    this.parent = parent;
  }

  willUnmount() {
    this.connected.forEach((id) => this.node.disconnect(id));
    return super.willUnmount();
  }

  rerenderYogaTree() {
    this.calculateLayout();
    rerenderYogaChildren(this as YogaInstance);
  }

  calculateLayout() {
    this.yogaNode.calculateLayout(this.estimatedWidth, this.estimatedHeight, Yoga.DIRECTION_LTR);
  }

  willMount() {
    const parent = this.parent as YogaInstance;
    if (!parent.yogaNode) {
      setYogaRoot(this);
      this.yogaRoot?.calculateLayout();
    }
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
    if (this.allocatedSize?.[0]) return this.allocatedSize[0];
    const { width } = this;
    if (width > -1) return width;
    return this.parent?.estimatedWidth;
  }

  get estimatedHeight() {
    if (this.allocatedSize?.[1]) return this.allocatedSize[1];
    const { height } = this;
    if (height > -1) return height;
    return this.parent?.estimatedHeight;
  }
}

function rerenderYogaChildren(instance: YogaInstance) {
  instance.renderYoga();
  if (instance.type === 'FlexBox' || instance.type === 'FlexRoot') {
    (instance.children as YogaInstance[]).forEach((child: YogaInstance) => {
      rerenderYogaChildren(child);
    });
  }
}

function setYogaRoot(instance: FlexRoot): void;
function setYogaRoot(instance: YogaInstance | FlexRoot, yogaRoot?: FlexRoot): void;
function setYogaRoot(instance: YogaInstance | FlexRoot, yogaRoot?: FlexRoot) {
  if (!yogaRoot) yogaRoot = instance as FlexRoot;
  instance.yogaRoot = yogaRoot;
  (instance.yogaChildren || []).forEach((instance: YogaInstance) => setYogaRoot(instance, yogaRoot));
}
