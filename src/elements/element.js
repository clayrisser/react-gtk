export default class Element {
  children = [];

  constructor(props = {}) {
    this.props = props;
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
