import Gtk from '../gtk';
import Element from './Element';

export default class Button extends Element {
  constructor(props = {}) {
    super(new Gtk.Button(), props, { isContainer: true });
  }
}
