import { BaseNode, Node, Instance, Props } from '../types';

export interface IElement {
  new (props?: Props): BaseElement;
  propTypes: object;
  defaultProps: Props;
}

export default class BaseElement implements Instance {
  static defaultProps: Props = {};

  static propTypes: object = {};

  node: Node;

  props: Props;

  children: BaseElement[] = [];

  constructor(baseNode: BaseNode | BaseNode[], props: Props = {}) {
    this.node = baseNode;
    this.props = props;
  }

  appendChild(_child: BaseElement) {}

  removeChild(_child: BaseElement) {}

  commitMount() {}

  commitUpdate(_newProps: Props) {}
}
