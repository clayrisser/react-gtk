import Gtk from '../gtk';
import Element from './Element';

export default class Window extends Element {
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
