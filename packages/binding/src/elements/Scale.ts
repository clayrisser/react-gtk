import PropTypes from 'prop-types';
import Gtk from '../gtk';
import Element from './Element';

export default class Scale extends Element {
  static propTypes = {
    digits: PropTypes.number,
    drawValue: PropTypes.bool,
    hasOrigin: PropTypes.bool,
    valuePos: PropTypes.object,
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
    digits: null,
    drawValue: null,
    hasOrigin: null,
    valuePos: null,
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
    super(new Gtk.Scale(), props);
  }

  addMark(value: number, position: object, markup: string): null {
    return this.node.addMark(value, position, markup);
  }

  clearMarks(): null {
    return this.node.clearMarks();
  }
}
