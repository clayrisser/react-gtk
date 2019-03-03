import Gtk from '../gtk';
import Element from './Element';

export default class Entry extends Element {
  constructor(props = {}) {
    super(new Gtk.Entry(), props, { isText: true });
  }
}
