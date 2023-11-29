/*
 *  File: /src/render.ts
 *  Project: @react-gtk/core
 *  File Created: 28-11-2023 22:32:06
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

import Renderer from './reconciler';
import dev from './dev';
import type { BundleType } from './types';
import { Gtk } from './gtk';
import { Window } from './elements/Window';

let hasStarted = false;

export function render(element: JSX.Element, title = 'React Gtk') {
  const window = new Window({});
  window.node.title = title;
  const root = Renderer.createContainer(window, 0, null, false, null, 'react_gtk_', (_err: Error) => undefined, null);
  Renderer.updateContainer(element, root, null, () => undefined);
  if (!hasStarted) {
    hasStarted = true;
    window.node.on('destroy', () => Gtk.mainQuit());
    window.node.showAll();
    Gtk.main();
  }
  Renderer.injectIntoDevTools({
    bundleType: Number(dev) as BundleType,
    rendererPackageName: '@react-gtk/core',
    version: '4.0.0',
  });
}
