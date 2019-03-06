import PropTypes from 'prop-types';
import Gtk from '../gtk';
import Element from './Element';

export default class Separator extends Element {
  constructor(props: object = {}) {
    super(new Gtk.Separator(), props);
  }
}
