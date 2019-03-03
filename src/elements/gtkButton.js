import Gtk from '../gtk';
import Element from './element';

export default class GtkButton extends Element {
  constructor(props = {}) {
    super(new Gtk.Button(), props, { isContainer: true });
  }
}
