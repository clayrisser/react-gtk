import PropTypes from 'prop-types';
import Gtk from '../gtk';
import Element from './Element';

export default class Spinner extends Element {
  static propTypes = {
    active: PropTypes.bool
  };

  static defaultProps = {
    active: null
  };

  constructor(props: object = {}) {
    super(new Gtk.Spinner(), props);
  }

  start(): null {
    return this.node.start();
  }

  stop(): null {
    return this.node.stop();
  }
}
