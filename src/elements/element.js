import PropTypes from 'prop-types';

export default class Element {
  static defaultProps = {};

  children = [];

  constructor(node, props = {}, meta = {}) {
    const { isContainer = false, mapChildren } = meta;
    this.props = props;
    this.node = node;
    this.isContainer = isContainer;
    this.mapChildren = mapChildren;
    this.setDefaultProps();
  }

  appendChild(child) {
    this.node.showAll();
    this.children.push(child);
    if (this.isContainer) this.node.add(child.node);
  }

  removeChild(child) {
    this.children.splice(this.children.indexOf(child), 1);
    if (this.isContainer) this.node.remove(child.node);
  }

  commitMount() {
    this.update();
  }

  commitUpdate(newProps) {
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
    Object.keys(this.props).forEach(key => {
      const prop = this.props[key];
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
    const { defaultProps } = this.constructor;
    const props = {};
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
    };
    PropTypes.checkPropTypes(
      this.constructor.propTypes,
      this.props,
      'prop',
      this.constructor.name
    );
  }
}
