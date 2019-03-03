export default class Element {
  children = [];

  constructor(node, props = {}) {
    this.props = props;
    this.node = node;
    this.loadProps();
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
  }

  removeChild(child) {
    this.children.splice(this.children.indexOf(child), 1);
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
