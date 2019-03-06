import PropTypes from 'prop-types';
import Gtk from '../gtk';
import Element from './Element';

export default class Misc extends Element {
  static propTypes = {
    xalign: PropTypes.number,
    xpad: PropTypes.number,
    yalign: PropTypes.number,
    ypad: PropTypes.number
  };

  static defaultProps = {
    xalign: null,
    xpad: null,
    yalign: null,
    ypad: null
  };

  constructor(props: object = {}) {
    super(new Gtk.Misc(), props);
  }
}
