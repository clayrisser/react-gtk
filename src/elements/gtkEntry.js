import Gtk from '../gtk';
import Element from './element';

export default class GtkEntry extends Element {
  constructor(props = {}) {
    super(new Gtk.Entry(), props, { isText: true });
  }
}
