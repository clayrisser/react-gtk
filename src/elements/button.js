import { Gtk } from 'node-gir';
import Element from './element';

export default class Button extends Element {
  constructor(props = {}) {
    super(props);
    this.node = new Gtk.Button();
  }
}
