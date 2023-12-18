/*
 *  File: /src/elements/Image.ts
 *  Project: @react-gtk/core
 *  File Created: 01-12-2023 09:58:18
 *  Author: dharmendra
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
      Image: any;
    }
  }
}

export type ImageProps = JSX.IntrinsicElements['Image'];

export class Image extends Element {
  node: Gtk.Image;

  constructor(props: ImageProps = {}) {
    const node = new Gtk.Image();
    super(node, props);
    this.node = node;
  }
}
