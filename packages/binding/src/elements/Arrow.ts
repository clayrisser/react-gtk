import PropTypes from 'prop-types';
import Gtk from '../gtk';
import Element from './Element';

export default class Arrow extends Element {
  static propTypes = {
    arrowType: PropTypes.object,
    shadowType: PropTypes.object,
    xalign: PropTypes.number,
    xpad: PropTypes.number,
    yalign: PropTypes.number,
    ypad: PropTypes.number
  };

  static defaultProps = {
    arrowType: null,
    shadowType: null,
    xalign: null,
    xpad: null,
    yalign: null,
    ypad: null
  };

  constructor(props: object = {}) {
    super(new Gtk.Arrow(), props);
  }
}
