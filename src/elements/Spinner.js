import PropTypes from 'prop-types';
import Gtk from '../gtk';
import Element from './Element';

export default class Spinner extends Element {
  static propTypes = {
    active: PropTypes.bool
  };

  static defaultProps = {
    active: false
  };

  constructor(props = {}) {
    super(new Gtk.Spinner(), props);
  }

  stop() {
    this.node.stop();
  }

  start() {
    this.node.start();
  }
}
