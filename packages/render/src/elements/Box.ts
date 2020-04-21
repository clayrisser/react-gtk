import BaseElement from './BaseElement';
import Gtk from '../gtk';
import { Props } from '../types';

export default class Box extends BaseElement<Gtk.Box> {
  static propTypes: object;

  static defaultProps: Props;

  constructor(props: Props = {}) {
    super(new Gtk.Box(), props);
  }
}
