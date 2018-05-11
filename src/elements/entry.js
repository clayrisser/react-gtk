import { Gtk } from 'node-gir';
import Element from './element';

export default class Entry extends Element {
  constructor(props = {}) {
    super(props);
    this.node = new Gtk.Entry();
    this.node.setText(this.props.children || '');
  }
}
