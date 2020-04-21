import { WeakValidationMap } from 'react';

export class Instance<Widget = any> {
  static defaultProps: Props = {};

  static propTypes: WeakValidationMap<any> = {};

  constructor(_props: Props = {}) {}

  appendChild(_child: Instance | TextInstance): void {}

  children: Instance[];

  commitMount(): void {}

  commitUpdate(_newProps: Props): void {}

  node: Node<Widget>;

  props: Props;

  removeChild(_child: Instance | TextInstance): void {}
}

export interface PropMap {
  [key: string]: string;
}

export interface Meta {
  propMap?: PropMap;
}

export interface Options {
  title: string;
  debug: boolean;
}

export type BundleType = 0 | 1;

export type Type = string;

export type Prop = any;

export type ContextItem = any;

export type HydratableInstance = any;

export type PublicInstance<Widget = any> =
  | Instance<Widget>
  | TextInstance<Widget>;

export type HostContext = Context;

export type UpdatePayload = any;

export type ChildSet = any;

export type TimeoutHandle = any;

export type NoTimeout = any;

export interface Container<Widget = any> extends Instance<Widget> {}

export interface TextInstance<Widget = any> extends Instance<Widget> {}

export interface DeepArray<T> extends Array<T | DeepArray<T>> {}

export interface Props {
  [key: string]: Prop;
}

export interface Pkg {
  [key: string]: any;
}

export interface Context {
  [key: string]: ContextItem;
}

export type Node<Widget = Gtk.Widget> = Widget;
