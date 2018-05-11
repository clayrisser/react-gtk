import { Gtk } from 'node-gir';
import Element from './element';

export default class Button extends Element {
  constructor(props = {}) {
    super(props);
    this.node = new Gtk.Button();
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
