import PropTypes from 'prop-types';
import { WeakValidationMap } from 'react';
import { Node, Prop, Props, Meta, Instance, TextInstance } from './types';

export default class BaseElement<Widget = Gtk.Widget> {
  static defaultProps: Props = {};

  static propTypes: WeakValidationMap<any> = {};

  private _isContainer: boolean;

  meta: Meta = {};

  node: Node<Widget>;

  props: Props;

  children: Instance[] = [];

  constructor(
    node: Node<Widget> | Node<Widget>[],
    props: Props = {},
    meta: Partial<Meta> = {}
  ) {
    if (Array.isArray(node)) throw new Error('cannot be array');
    this.meta = { ...this.meta, ...meta };
    this.node = node;
    this.props = this.getProps(props);
  }

  get isContainer() {
    if (typeof this._isContainer !== 'undefined') return this._isContainer;
    const node = (this.node as unknown) as Gtk.Container;
    this._isContainer = typeof node.add === 'function';
    return this._isContainer;
  }

  appendChild(child: Instance | TextInstance) {
    const node = (this.node as unknown) as Gtk.Container;
    this.update();
    this.children.push(child);
    if (this.isContainer) node.add(child.node);
  }

  removeChild(child: Instance | TextInstance) {
    const node = (this.node as unknown) as Gtk.Container;
    this.children.splice(this.children.indexOf(child), 1);
    if (this.isContainer) node.remove(child.node);
  }

  commitMount() {
    this.update();
  }

  commitUpdate(newProps: Props) {
    this.props = {
      ...this.props,
      ...newProps,
    };
    this.update();
  }

  update() {
    const node = (this.node as unknown) as Gtk.Widget;
    this.updateNode();
    node.showAll();
  }

  updateNode() {
    const node = (this.node as unknown) as { [key: string]: any };
    Object.entries(this.meta.propMap || {}).forEach(
      ([reactProp, nodeProp]: [string, string]) => {
        if (typeof this.props[reactProp] !== 'undefined') {
          node[nodeProp] = this.props[reactProp];
        }
      }
    );
    Object.keys(this.props).forEach((key: string) => {
      const prop: Prop = this.props[key];
      if (key !== 'children' && typeof prop !== 'undefined' && prop !== null) {
        node[key] = prop;
      }
    });
  }

  getProps(props: Props): Props {
    props = { ...props };
    const { defaultProps, propTypes } = this.constructor as typeof BaseElement;
    Object.keys(defaultProps).forEach((key) => {
      const defaultProp = defaultProps[key];
      if (typeof props[key] === 'undefined' || props[key] === null) {
        props[key] = defaultProp;
      }
    });
    PropTypes.checkPropTypes(propTypes, props, 'prop', this.constructor.name);
    return props;
  }
}
