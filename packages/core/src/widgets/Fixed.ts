/*
 *  File: /src/widgets/Fixed.ts
 *  Project: @react-gtk/core
 *  File Created: 21-12-2023 12:26:30
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

import Graphene from '@girs/node-graphene-1.0';
import Gsk from '@girs/node-gsk-4.0';
import Gtk from '@girs/node-gtk-4.0';
import { registerClass } from '../gi';

export class Fixed extends Gtk.Widget {
  static GTypeName = 'ReactGtkFixed';

  constructor() {
    super();
    this.setLayoutManager(new Gtk.FixedLayout());
    this.setOverflow(Gtk.Overflow.HIDDEN);
  }

  allocate(width: number, height: number, baseline: number, transform: Gsk.Transform | null): void {
    console.log('allocate');
    super.allocate(width, height, baseline, transform);
  }

  sizeAllocate(width: number, height: number, baseline: number): void {
    console.log('size allocate');
    super.sizeAllocate(width, height, baseline);
  }

  measure(orientation: Gtk.Orientation, forSize: number): [number, number, number, number] {
    console.log('measure');
    return super.measure(orientation, forSize);
  }

  computeExpand() {
    let hexpand = false;
    let vexpand = false;
    let child = this.getFirstChild();
    while (child) {
      hexpand = hexpand || (child.computeExpand as any)(Gtk.Orientation.HORIZONTAL);
      vexpand = vexpand || (child.computeExpand as any)(Gtk.Orientation.VERTICAL);
      child = child.getNextSibling();
    }
    return [hexpand, vexpand];
  }

  getRequestMode() {
    let wfh = 0;
    let hfw = 0;
    let child = this.getFirstChild();
    while (child) {
      let mode = child.getRequestMode();
      switch (mode) {
        case Gtk.SizeRequestMode.HEIGHT_FOR_WIDTH:
          hfw++;
          break;
        case Gtk.SizeRequestMode.WIDTH_FOR_HEIGHT:
          wfh++;
          break;
        default:
          break;
      }
      child = child.getNextSibling();
    }
    if (hfw === 0 && wfh === 0) {
      return Gtk.SizeRequestMode.CONSTANT_SIZE;
    } else {
      return wfh > hfw ? Gtk.SizeRequestMode.WIDTH_FOR_HEIGHT : Gtk.SizeRequestMode.HEIGHT_FOR_WIDTH;
    }
  }

  dispose() {
    let child = this.getFirstChild();
    while (child) {
      this.remove(child);
      child = this.getFirstChild();
    }
    return super.dispose();
  }

  put(widget: Gtk.Widget, x: number, y: number): void {
    if (!widget || widget.parent) return;
    widget.setParent(this);
    const point = new Graphene.Point();
    point.x = x;
    point.y = y;
    const transform = new Gsk.Transform().translate(point);
    this.setChildTransform(widget, transform);
  }

  getChildPosition(widget: Gtk.Widget) {
    if (!widget || widget.parent !== this) return;
    const point = new Graphene.Point();
    point.x = 0;
    point.y = 0;
    const [success, computedPoint] = widget.computePoint(this, point);
    if (!success || !computedPoint) return;
    return [computedPoint.x, computedPoint.y];
  }

  setChildTransform(widget: Gtk.Widget, transform: Gsk.Transform | null): void {
    if (!widget || widget.parent !== this || !transform) return;
    const layoutChild = this.getLayoutChild(widget);
    layoutChild.setTransform && layoutChild.setTransform(transform);
  }

  getChildTransform(widget: Gtk.Widget): Gsk.Transform | null {
    if (!widget || widget.parent !== this) return null;
    const layoutChild = this.getLayoutChild(widget);
    return layoutChild.getTransform ? layoutChild.getTransform() : null;
  }

  move(widget: Gtk.Widget, x: number, y: number): void {
    if (!widget || widget.parent !== this) return;
    const point = new Graphene.Point();
    point.x = x;
    point.y = y;
    const transform = new Gsk.Transform().translate(point);
    this.setChildTransform(widget, transform);
  }

  remove(widget: Gtk.Widget): void {
    if (!widget || widget.parent !== this) return;
    widget.unparent();
  }

  private getLayoutChild(widget: Gtk.Widget) {
    return this.getLayoutManager()?.getLayoutChild(widget) as Gtk.FixedLayoutChild;
  }
}

registerClass(Fixed);
