/*
 *  File: /src/module.ts
 *  Project: @react-gtk/generate
 *  File Created: 06-12-2023 07:10:18
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

import path from 'path';
import { ModuleLoader } from '@ts-for-gir/cli';
import { homedir } from 'os';

async function loadModule(girModule = 'Gtk-4.0') {
  const moduleLoader = new ModuleLoader({
    environment: 'gjs',
    girDirectories: [
      '/usr/lib/x86_64-linux-gnu/mutter-10',
      '/usr/lib/x86_64-linux-gnu/mutter-11',
      '/usr/lib/x86_64-linux-gnu/mutter-12',
      '/usr/lib64/mutter-10',
      '/usr/lib64/mutter-11',
      '/usr/lib64/mutter-12',
      '/usr/local/share/gir-1.0',
      '/usr/share/gir-1.0',
      '/usr/share/gnome-shell',
      '/usr/share/gnome-shell/gir-1.0',
      '/var/lib/flatpak/exports/share/gir-1.0',
      '/var/lib/snapd/desktop/gir-1.0',
      path.join(homedir(), '.local/share/flatpak/exports/share/gir-1.0'),
    ],
    root: process.cwd(),
    outdir: path.resolve(process.cwd(), 'out'),
    verbose: false,
    buildType: 'lib',
    moduleType: 'esm',
    noNamespace: false,
    noComments: false,
    noDebugComments: false,
    fixConflicts: true,
    generateAlias: false,
    promisify: true,
    npmScope: '@girs',
    package: false,
    packageYarn: false,
  });
  return moduleLoader.getModulesResolved([girModule]);
}

export async function loadGtkModule() {
  return (await loadModule()).grouped.gtk.modules?.[0].module;
}
