import PropTypes from 'prop-types';
import { Instance, GtkNode, Prop, Props } from '../types';

export interface ElementConstructor {
  new (node: GtkNode, props?: Props, meta?: Meta): Element;
  propTypes: object;
  defaultProps: Props;
}

interface Meta {
  isContainer?: boolean;
  mapChildren?: string;
}

export default class Element implements Instance {
  static defaultProps: Props = {};

  static propTypes: object = {};

  node: GtkNode;

  props: Props;

  isContainer: boolean;

  mapChildren?: string;

  children: Element[] = [];

  constructor(node: GtkNode, props: Props = {}, meta: Meta = {}) {
    const { isContainer = false, mapChildren }: Meta = meta;
    this.props = props;
    this.node = node;
    this.isContainer = isContainer;
    this.mapChildren = mapChildren;
    this.setDefaultProps();
  }

  appendChild(child: Element) {
    this.node.showAll();
    this.children.push(child);
    if (this.isContainer) this.node.add(child.node);
  }

  removeChild(child: Element) {
    this.children.splice(this.children.indexOf(child), 1);
    if (this.isContainer) this.node.remove(child.node);
  }

  commitMount() {
    this.update();
  }

  commitUpdate(newProps: Props) {
    this.props = {
      ...this.props,
      ...newProps
    };
    this.update();
  }

  update() {
    this.updateNode();
    this.node.showAll();
  }

  updateNode() {
    if (
      this.mapChildren &&
      typeof this.props.children !== 'undefined' &&
      this.props.children !== null
    ) {
      this.node[this.mapChildren] = this.props.children;
    }
    Object.keys(this.props).forEach((key: string) => {
      const prop: Prop = this.props[key];
      if (
        typeof prop !== 'undefined' &&
        prop !== null &&
        Object.keys(Object.getPrototypeOf(this.node)).includes(key)
      ) {
        this.node[key] = prop;
      }
    });
  }

  setDefaultProps() {
    const { defaultProps, propTypes } = this.constructor as ElementConstructor;
    const props: Props = {};
    Object.keys(defaultProps).forEach(key => {
      const defaultProp = defaultProps[key];
      if (
        !(defaultProp in this.props) ||
        typeof this.props[key] === 'undefined'
      ) {
        props[key] = defaultProp;
      }
    });
    this.props = {
      ...this.props,
      props
    } as Props;
    PropTypes.checkPropTypes(
      propTypes,
      this.props,
      'prop',
      this.constructor.name
    );
  }
}
