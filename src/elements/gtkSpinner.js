import Gtk from '../gtk';
import Element from './element';

export default class GtkSpinner extends Element {
  constructor(props = {}) {
    super(new Gtk.Spinner(), props);
    this.node.start();
  }

  update() {
    super.update();
    if (this.props.spinning) {
      this.node.start();
    } else {
      this.node.stop();
    }
  }
}
