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

export interface TextInstance extends Instance {}

export interface Container extends Instance {}

export interface Props {
  [key: string]: Prop;
}

export interface Context {
  [key: string]: ContextItem;
}

export interface Instance {
  appendChild(child: Instance): void;
  children: Instance[];
  node: GtkNode;
  props: Props;
  removeChild(child: Instance): void;
}

export interface GtkNode {
  [key: string]: any;
}
