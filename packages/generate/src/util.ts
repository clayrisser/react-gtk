/*
 *  File: /src/util.ts
 *  Project: @react-gtk/generate
 *  File Created: 22-12-2023 04:29:14
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

export function lookupLibImport(lib: string): ImportType | undefined {
  switch (lib) {
    case 'GLib':
      return {
        default: lib,
        from: '@girs/node-glib-2.0',
      };
    case 'GObject':
      return {
        default: lib,
        from: '@girs/node-gobject-2.0',
      };
    case 'Gdk':
      return {
        default: lib,
        from: '@girs/node-gdk-4.0',
      };
    case 'Gio':
      return {
        default: lib,
        from: '@girs/node-gio-2.0',
      };
    case 'Gtk':
      return {
        default: lib,
        from: '@girs/node-gtk-4.0',
      };
    case 'Gsk':
      return {
        default: lib,
        from: '@girs/node-gsk-4.0',
      };
    case 'Pango':
      return {
        default: lib,
        from: '@girs/node-pango-1.0',
      };
    default:
      return;
  }
}

export interface ImportType {
  import?: string[];
  from: string;
  default?: string;
}
