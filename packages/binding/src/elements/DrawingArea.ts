import PropTypes from 'prop-types';
import Gtk from '../gtk';
import Element from './Element';

export default class DrawingArea extends Element {
  constructor(props: object = {}) {
    super(new Gtk.DrawingArea(), props);
  }
}
