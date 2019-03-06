import PropTypes from 'prop-types';
import Gtk from '../gtk';
import Element from './Element';

export default class HSV extends Element {
  constructor(props: object = {}) {
    super(new Gtk.HSV(), props);
  }

  isAdjusting(): boolean {
    return this.node.isAdjusting();
  }
}
