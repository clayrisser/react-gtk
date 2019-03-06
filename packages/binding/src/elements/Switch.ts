import PropTypes from 'prop-types';
import Gtk from '../gtk';
import Element from './Element';

export default class Switch extends Element {
  static propTypes = {
    active: PropTypes.bool,
    state: PropTypes.bool
  };

  static defaultProps = {
    active: null,
    state: null
  };

  constructor(props: object = {}) {
    super(new Gtk.Switch(), props);
  }
}
