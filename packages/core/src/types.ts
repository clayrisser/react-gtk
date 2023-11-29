/*
 *  File: /src/types.ts
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

export type BundleType = 0 | 1;

export type Type = string;

export type ContextItem = any;

export type Prop = any;

export type HydratableInstance = any;

export type PublicInstance = Instance | TextInstance;

export type HostContext = Context;

export type UpdatePayload = any;

export type ChildSet = any;

export type TimeoutHandle = any;

export type NoTimeout = any;

export type SuspenseInstance = any;

export interface TextInstance extends Instance {}

export interface Container extends Instance {}

export interface Props {
  [key: string]: Prop;
}

export interface Context {
  [key: string]: ContextItem;
}

export interface ElementMeta {
  isContainer?: boolean;
  mapChildren?: string;
}

export interface Instance {
  appendChild: (child: Instance | TextInstance) => void;
  children: Instance[];
  commitMount: () => void;
  commitUpdate: (newProps: Props) => void;
  node: GtkNode;
  props: Props;
  removeChild: (child: Instance | TextInstance) => void;
}

export interface GtkNode {
  [key: string]: any;
}
