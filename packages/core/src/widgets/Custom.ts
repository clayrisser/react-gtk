/*
 *  File: /src/widgets/Custom.ts
 *  Project: @react-gtk/core
 *  File Created: 21-12-2023 11:01:40
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
import Gdk from '@girs/node-gdk-4.0';
import Graphene from '@girs/node-graphene-1.0';

// Gtk.init();

export class CustomWidget extends Gtk.Widget {
  customMethod() {}

  measure(orientation: Gtk.Orientation, _forSize: number): [number, number, number, number] {
    console.log('measure');
    const [minWidth, natWidth] = [100, 200];
    const [minHeight, natHeight] = [20, 40];
    const isHorizontal = orientation === Gtk.Orientation.HORIZONTAL;
    const minimum = isHorizontal ? minWidth : minHeight;
    const natural = isHorizontal ? natWidth : natHeight;
    const minimumBaseline = !isHorizontal ? minWidth : minHeight;
    const naturalBaseline = !isHorizontal ? natWidth : natHeight;
    return [minimum, natural, minimumBaseline, naturalBaseline];
  }

  snapshot(snapshot: Gtk.Snapshot): void {
    console.log('snapshot');
    const width = this.getAllocatedWidth();
    const color = Gdk.RGBA.create('red');
    const rect = Graphene.Rect.create(10, 10, width / 2, 10);
    snapshot.appendColor(color, rect);
  }
}

gi.registerClass(CustomWidget);
