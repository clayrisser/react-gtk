import PropTypes from 'prop-types';
import Gtk from '../gtk';
import Element from './Element';

export default class ProgressBar extends Element {
  static propTypes = {
    ellipsize: PropTypes.object,
    fraction: PropTypes.number,
    inverted: PropTypes.bool,
    pulseStep: PropTypes.number,
    showText: PropTypes.bool,
    text: PropTypes.string
  };

  static defaultProps = {
    ellipsize: null,
    fraction: null,
    inverted: null,
    pulseStep: null,
    showText: null,
    text: null
  };

  constructor(props: object = {}) {
    super(new Gtk.ProgressBar(), props);
  }

  pulse(): null {
    return this.node.pulse();
  }
}
