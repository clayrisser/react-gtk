import PropTypes from 'prop-types';
import Gtk from '../gtk';
import Element from './Element';

export default class HSeparator extends Element {
  constructor(props: object = {}) {
    super(new Gtk.HSeparator(), props);
  }
}
