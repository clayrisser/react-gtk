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

import GLib from '@girs/node-glib-2.0';
import Gtk from '@girs/node-gtk-4.0';
import Renderer from './reconciler';
import { ApplicationWindow } from './elements/ApplicationWindow';
import { BundleType } from 'react-reconciler';
import { dev } from './util';

let hasRun = false;

export async function render(
  element: JSX.Element,
  app?: Gtk.Application,
  applicationId = 'com.example.app',
  loop = GLib.MainLoop.new(null, false),
) {
  return new Promise((resolve) => {
    if (!app) app = new Gtk.Application(applicationId, 0);
    app.on('activate', () => {
      const window = new ApplicationWindow(app!, {});
      window.node.on('close-request', () => {
        app?.quit();
        loop.quit();
        return false;
      });
      const root = Renderer.createContainer(
        window,
        0,
        null,
        false,
        null,
        'react_gtk_',
        (_err: Error) => undefined,
        null,
      );
      Renderer.injectIntoDevTools({
        bundleType: Number(dev) as BundleType,
        rendererPackageName: '@react-gtk/core',
        version: '4.0.0',
      });
      Renderer.updateContainer(element, root, null, () => undefined);
      window.node.show();
      window.node.present();
      resolve(loop.run());
    });
    if (!hasRun) {
      hasRun = true;
      app.run([]);
    }
  });
}
