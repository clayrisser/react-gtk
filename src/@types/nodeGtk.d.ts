/**
 * File: /src/@types/nodeGtk.d.ts
 * Project: react-gtk
 * File Created: 10-07-2021 20:35:08
 * Author: Clay Risser <email@clayrisser.com>
 * -----
 * Last Modified: 10-07-2021 20:35:11
 * Modified By: Clay Risser <email@clayrisser.com>
 * -----
 * Silicon Hills LLC (c) Copyright 2021
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

declare type Gtk = any;

declare class NodeGtk {
  static require(library: string, version: string): Gtk;

  static startLoop(): any;
}

declare module 'node-gtk' {
  export = NodeGtk;
}
