/*
 *  File: /src/elements/Box.ts
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
import { Element } from './Element';

export type BoxProps = JSX.IntrinsicElements['Box'];
export class Box extends Element {
  node: Gtk.Box;

  constructor({ style, ...props }: BoxProps) {
    const node = new Gtk.Box();
    super(
      node,
      { ...props, ...style },
      {
        appendChild: (child: Gtk.Widget) => node.append(child),
        removeChild: (child: Gtk.Widget) => node.remove(child),
      },
    );
    this.node = node;
  }
}
