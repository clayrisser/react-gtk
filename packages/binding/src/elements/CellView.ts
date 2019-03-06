import PropTypes from 'prop-types';
import Gtk from '../gtk';
import Element from './Element';

export default class CellView extends Element {
  static propTypes = {
    background: PropTypes.string,
    backgroundGdk: PropTypes.object,
    backgroundRgba: PropTypes.object,
    backgroundSet: PropTypes.bool,
    cellArea: PropTypes.object,
    cellAreaContext: PropTypes.object,
    drawSensitive: PropTypes.bool,
    fitModel: PropTypes.bool,
    model: PropTypes.object
  };

  static defaultProps = {
    background: null,
    backgroundGdk: null,
    backgroundRgba: null,
    backgroundSet: null,
    cellArea: null,
    cellAreaContext: null,
    drawSensitive: null,
    fitModel: null,
    model: null
  };

  constructor(props: object = {}) {
    super(new Gtk.CellView(), props);
  }
}
