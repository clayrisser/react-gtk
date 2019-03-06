import PropTypes from 'prop-types';
import Gtk from '../gtk';
import Element from './Element';

export default class Range extends Element {
  static propTypes = {
    adjustment: PropTypes.object,
    fillLevel: PropTypes.number,
    inverted: PropTypes.bool,
    lowerStepperSensitivity: PropTypes.object,
    restrictToFillLevel: PropTypes.bool,
    roundDigits: PropTypes.number,
    showFillLevel: PropTypes.bool,
    upperStepperSensitivity: PropTypes.object
  };

  static defaultProps = {
    adjustment: null,
    fillLevel: null,
    inverted: null,
    lowerStepperSensitivity: null,
    restrictToFillLevel: null,
    roundDigits: null,
    showFillLevel: null,
    upperStepperSensitivity: null
  };

  constructor(props: object = {}) {
    super(new Gtk.Range(), props);
  }
}
