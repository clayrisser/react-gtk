/*
 *  File: /src/widgets/FlexRoot.ts
 *  Project: @react-gtk/core
 *  File Created: 21-12-2023 10:31:51
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

// @ts-ignore
import gi from 'node-gtk';
import Gtk from '@girs/node-gtk-4.0';

export class FlexRoot extends Gtk.Fixed {
  static GTypeName = 'NodeGTKFlexRoot';

  computeExpand(hexpandP: boolean, vexpandP: boolean) {
    console.log('compute expand');
    return super.computeExpand(hexpandP, vexpandP);
  }

  focus(direction: Gtk.DirectionType) {
    console.log('focus');
    return super.focus(direction);
  }

  sizeAllocate(width: number, height: number, baseline: number): void {
    console.log('size allocate');
    return super.sizeAllocate(width, height, baseline);
  }
  // measure(orientation: Gtk.Orientation, forSize: number): [number, number, number, number] {
  //   console.log('MEASURE');
  //   return super.measure(orientation, forSize);
  // }
}
console.log('r');
gi.registerClass(FlexRoot);
console.log('R');
