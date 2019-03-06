import PropTypes from 'prop-types';
import Gtk from '../gtk';
import Element from './Element';

export default class Invisible extends Element {
  static propTypes = {
    screen: PropTypes.object
  };

  static defaultProps = {
    screen: null
  };

  constructor(props: object = {}) {
    super(new Gtk.Invisible(), props);
  }
}
