/*
 *  File: /src/elements/Grid.ts
 *  Project: @react-gtk/core
 *  File Created: 05-12-2023 11:04:38
 *  Author: HariKrishna
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
import { Element } from './Element';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      Grid: any;
    }
  }
}

export type GridProps = JSX.IntrinsicElements['Grid'];
export class Grid extends Element {
  node: Gtk.Grid;

  constructor(props: GridProps) {
    const node = new Gtk.Grid();
    super(node, props, {
      appendChild: (child: Gtk.Widget) => node.attach(child, 0, 0, 1, 1),
      removeChild: (child: Gtk.Widget) => node.remove(child),
    });
    this.node = node;
  }
}
