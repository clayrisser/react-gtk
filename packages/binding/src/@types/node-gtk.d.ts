declare type Gtk = any;

declare class NodeGtk {
  static require(library: string, version: string): Gtk;

  static startLoop(): any;
}

declare module 'node-gtk' {
  export = NodeGtk;
}
