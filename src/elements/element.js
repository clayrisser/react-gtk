export default class Element {
  children = [];

  constructor(node, props = {}, meta = {}) {
    const { isContainer = false, isText } = meta;
    this.props = props;
    this.node = node;
    this.isContainer = isContainer;
    this.isText = isText;
    this.loadProps();
    if (this.isText) this.node.setText(this.props.children || '');
  }

  loadProps() {
    Object.keys(this.props).forEach(key => {
      const prop = this.props[key];
      if (Object.keys(Object.getPrototypeOf(this.node)).includes(key)) {
        this.node[key] = prop;
      }
    });
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
    this.node.showAll();
  }
}
