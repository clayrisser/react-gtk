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
import type { Text } from './elements/Text';

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

export type UpdatePayload = any;

export type ChildSet = any;

export type TimeoutHandle = any;

export type NoTimeout = any;

export type SuspenseInstance = any;

export interface TextInstance extends Text {}

export interface Container extends Instance {}

export interface Props {
  [key: string]: Prop;
}

export interface Context {
  [key: string]: ContextItem;
}

export type AppendChild = (child: Instance, options: AppendChildOptions) => void;

export type RemoveChild = (child: Instance, ...args: any[]) => void;

export interface ElementMeta {
  appendChild?: AppendChild;
  prepareUnmount?: () => void;
  removeChild?: RemoveChild;
  virtual?: boolean;
}

export interface SharedOptions {
  stage: Stage;
}

export interface AppendChildOptions extends SharedOptions {
  parentIsContainer: boolean;
}

export interface CommitMountOptions extends Omit<SharedOptions, 'stage'> {}

export interface CommitUpdateOptions extends Omit<SharedOptions, 'stage'> {}

export interface RemoveChildOptions extends SharedOptions {}

export interface RemoveAllChildrenOptions extends SharedOptions {}

export interface PreparePortalMountOptions extends Omit<SharedOptions, 'stage'> {}

export interface Instance {
  appendChild: (child: Instance, options?: Partial<AppendChildOptions>) => void;
  children: Instance[];
  commitMount: (options?: Partial<CommitMountOptions>) => void;
  commitUpdate: (newProps: Props, options?: Partial<CommitUpdateOptions>) => void;
  css: string[];
  id: string;
  node: GtkNode;
  preparePortalMount: (options?: Partial<PreparePortalMountOptions>) => void;
  prepareUnmount: () => void;
  props: Props;
  removeAllChildren: (options?: Partial<RemoveAllChildrenOptions>) => void;
  removeChild: (child: Instance, options?: Partial<RemoveChildOptions>) => void;
  type: string;
}

export interface YogaInstance extends Instance {
  yogaChildren?: YogaNode[];
  yogaNode: YogaNode;
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

export enum Stage {
  Mount = 'mount',
  Update = 'update',
}
