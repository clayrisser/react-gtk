export interface Options {
  [key: string]: any;
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

export interface Instance<Widget = any> {
  appendChild(child: Instance<Widget> | TextInstance<Widget>): void;
  children: Instance<Widget>[];
  commitMount(): void;
  commitUpdate(newProps: Props): void;
  node: Node<Widget>;
  props: Props;
  removeChild(child: Instance<Widget> | TextInstance<Widget>): void;
}

export interface Pkg {
  [key: string]: any;
}

export interface Context {
  [key: string]: ContextItem;
}

export type Node<Widget = Gtk.Widget> = Widget;
