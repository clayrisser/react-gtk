import PropTypes from 'prop-types';

export default class Element {
  static defaultProps = {};

  children = [];

  constructor(node, props = {}, meta = {}) {
    const { isContainer = false, isText } = meta;
    this.props = props;
    this.node = node;
    this.isContainer = isContainer;
    this.isText = isText;
    this.setDefaultProps();
    if (this.isText) this.node.setText(this.props.children || '');
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
    Object.keys(this.props).forEach(key => {
      const prop = this.props[key];
      if (Object.keys(Object.getPrototypeOf(this.node)).includes(key)) {
        this.node[key] = prop;
      }
    });
    this.node.showAll();
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
