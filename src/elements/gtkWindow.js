import Gtk from '../gtk';
import Element from './element';

export default class GtkWindow extends Element {
  constructor(props = {}) {
    super(
      new Gtk.Window({
        type: Gtk.WindowType.TOPLEVEL,
        title: props.title || 'React Gtk'
      }),
      props,
      { isContainer: true }
    );
  }
}
