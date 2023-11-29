/*
 *  File: /src/gtk.ts
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

// @ts-ignore
import nodeGtk from 'node-gtk';

let initialized = false;

function getGtk(version = '4.0') {
  const Gtk = nodeGtk.require('Gtk', version);
  if (!initialized) {
    initialized = true;
    nodeGtk.startLoop();
    Gtk.init();
  }
  return Gtk;
}

export const Gtk = getGtk();
