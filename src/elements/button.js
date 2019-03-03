import Gtk from '../gtk';
import Element from './element';

export default class Button extends Element {
  constructor(props = {}) {
    super(new Gtk.Button(), props);
  }

  appendChild(child) {
    super.appendChild(child);
    this.node.add(child.node);
  }

  removeChild(child) {
    super.removeChild(child);
    this.node.remove(child.node);
  }
}
