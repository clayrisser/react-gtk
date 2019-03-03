import Gtk from '../gtk';
import Element from './element';

export default class Window extends Element {
  constructor(props = {}) {
    super(
      new Gtk.Window({
        type: Gtk.WindowType.TOPLEVEL,
        title: props.title || 'React Gtk'
      }),
      props
    );
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
