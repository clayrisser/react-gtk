import { Gtk } from 'node-gir';
import Element from './element';

export default class Window extends Element {
  constructor(props = {}) {
    super(props);
    this.node = new Gtk.Window({
      type: Gtk.WindowType.TOPLEVEL,
      title: this.props.title || 'React Gtk'
    });
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
