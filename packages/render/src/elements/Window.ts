import BaseElement from './BaseElement';
import Gtk from '../gtk';
import { Props } from '../types';

export default class Window extends BaseElement<Gtk.Window> {
  static propTypes: object;

  static defaultProps: Props;

  constructor(props: Props = {}) {
    super(new Gtk.Window(), props);
  }
}
