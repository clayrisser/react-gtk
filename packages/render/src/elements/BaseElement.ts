import { ParserOptions } from '@babel/parser';
import { Node, Instance, Props } from '../types';

export interface IElement<Widget = any> {
  new (props?: Props, parserOptions?: ParserOptions): BaseElement<Widget>;
  propTypes: object;
  defaultProps: Props;
}

export default class BaseElement<Widget = globalThis.Gtk.Widget>
  implements Instance<Widget> {
  static defaultProps: Props = {};

  static propTypes: object = {};

  node: Node<Widget>;

  props: Props;

  children: BaseElement<Widget>[] = [];

  constructor(node: Node<Widget> | Node<Widget>[], _props: Props = {}) {
    if (Array.isArray(node)) throw new Error('cannot be array');
    this.node = node;
  }

  appendChild(_child: BaseElement<Widget>) {}

  removeChild(_child: BaseElement<Widget>) {}

  commitMount() {}

  commitUpdate(_newProps: Props) {}
}
