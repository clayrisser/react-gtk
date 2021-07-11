/**
 * File: /src/generate/types.ts
 * Project: react-gtk
 * File Created: 10-07-2021 21:16:21
 * Author: Clay Risser <email@clayrisser.com>
 * -----
 * Last Modified: 10-07-2021 23:44:55
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

import { HashMap } from '~/types';

export interface Node {
  attrs: Attrs;
  element: Element;
  name: string | null;
  nodeType: NodeType;
}

export type Attrs = HashMap<string | null>;

export enum NodeType {
  Klass = 'class',
  Method = 'method',
  Namespace = 'namespace',
  Parameter = 'parameter',
  Property = 'property',
  ReturnValue = 'return-value',
  Type = 'type'
}

export interface Klass extends Node {
  properties: Property[];
  methods: Method[];
  getParent(): Klass | void;
  hasParent(where?: Where): boolean;
}

export interface Property extends Node {
  type?: Type;
}

export interface Type extends Node {
  isArray: boolean;
}

export interface Namespace extends Node {
  klasses: Klass[];
}

export interface Where extends HashMap {}

export interface Method extends Node {
  parameters: Parameter[];
  returnValue?: ReturnValue;
}

export interface Parameter extends Node {}

export interface ReturnValue extends Node {
  type?: Type;
}
