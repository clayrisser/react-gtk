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

import type { Gtk } from '@girs/node-gtk-4.0';
import type { Node as YogaNode } from 'yoga-layout/wasm-sync';

export type BundleType = 0 | 1;

export type Type = string;

export type ContextItem = any;

export type Prop = any;

export type HydratableInstance = any;

export interface PublicInstance {
  css: string[];
  node: GtkNode;
}

export type HostContext = Context;

export interface Changes {
  props: string[];
  style: string[];
}

export interface UpdatePayload {
  changes: Changes;
}

export type ChildSet = any;

export type TimeoutHandle = any;

export type NoTimeout = any;

export type SuspenseInstance = any;

export interface TextInstance<Props = Record<string, any>> extends Instance<Gtk.Text, Props> {}

export interface Container extends Instance {}

export interface Context {
  [key: string]: ContextItem;
}

export type AppendChild = (child: Instance) => void;

export type RemoveChild = (child: Instance, ...args: any[]) => void;

export interface Instance<Node extends GtkNode = GtkNode, Props = Record<string, any>> {
  appendChild: (child: Instance | TextInstance) => void;
  children: Instance[];
  commitMount: (newProps: Props) => void;
  commitUpdate: (changes: Changes, newProps: Props, oldProps: Props) => void;
  css: string[];
  didMount: () => void;
  didUnmount: () => void;
  didUpdate: (changes: Changes) => void;
  estimatedHeight?: number;
  estimatedWidth?: number;
  id: string;
  insertBefore: (child: Instance | TextInstance, beforeChild: Instance | TextInstance) => void;
  mounted: boolean;
  node: Node;
  parent?: Instance;
  props: Props;
  removeAllChildren: () => void;
  removeChild: (child: Instance | TextInstance) => void;
  willMount: () => void;
  willUnmount: () => void;
  willUpdate: (changes: Changes) => void;
}

export interface YogaInstance extends Instance {
  yogaChildren?: YogaNode[];
  yogaNode: YogaNode;
  yogaRoot?: YogaNode;
}

export type GtkNode =
  | null
  | (Gtk.Widget & {
      _element?: Instance;
    });

export enum ContainerType {
  None = 0,
  Child = 1,
  Children = 2,
}
