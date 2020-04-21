import { WeakValidationMap } from 'react';
import { Node, Props, Meta, Instance, TextInstance } from '../types';

export default class BaseElement<Widget = any> {
  static defaultProps: Props = {};

  static propTypes: WeakValidationMap<any> = {};

  meta: Meta;

  node: Node<Widget>;

  props: Props;

  children: Instance[] = [];

  constructor(
    node: Node<Widget> | Node<Widget>[],
    props: Props = {},
    meta?: Partial<Meta>
  ) {
    if (Array.isArray(node)) throw new Error('cannot be array');
    if (meta) {
      this.meta = {
        ...this.meta,
        ...meta
      };
    }
    this.node = node;
    this.props = props;
  }

  appendChild(child: Instance | TextInstance) {
    // this.update();
    this.children.push(child);
    // if (this.isContainer) this.node.add(child.node);
  }

  removeChild(child: Instance | TextInstance) {
    this.children.splice(this.children.indexOf(child), 1);
    // if (this.isContainer) this.node.remove(child.node);
  }

  commitMount() {}

  commitUpdate(newProps: Props) {
    this.props = {
      ...this.props,
      ...newProps
    };
    // this.update();
  }
}
