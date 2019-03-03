import Gtk from '../gtk';
import Element from './element';

export default class Entry extends Element {
  constructor(props = {}) {
    super(new Gtk.Entry(), props);
    this.node.setText(this.props.children || '');
  }
}
