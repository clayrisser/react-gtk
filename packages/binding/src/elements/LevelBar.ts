import PropTypes from 'prop-types';
import Gtk from '../gtk';
import Element from './Element';

export default class LevelBar extends Element {
  static propTypes = {
    inverted: PropTypes.bool,
    maxValue: PropTypes.number,
    minValue: PropTypes.number,
    mode: PropTypes.object,
    value: PropTypes.number
  };

  static defaultProps = {
    inverted: null,
    maxValue: null,
    minValue: null,
    mode: null,
    value: null
  };

  constructor(props: object = {}) {
    super(new Gtk.LevelBar(), props);
  }

  addOffsetValue(name: string, value: number): null {
    return this.node.addOffsetValue(name, value);
  }

  removeOffsetValue(name: string): null {
    return this.node.removeOffsetValue(name);
  }
}
