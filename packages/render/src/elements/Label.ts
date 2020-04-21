import BaseElement from './BaseElement';
import Gtk from '../gtk';
import { Props } from '../types';

export default class Label extends BaseElement<Gtk.Label> {
  static propTypes: object;

  static defaultProps: Props;

  constructor(props: Props = {}) {
    super(new Gtk.Label(), props, {
      propMap: { children: 'label' }
    });
  }
}
