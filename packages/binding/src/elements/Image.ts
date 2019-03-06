import PropTypes from 'prop-types';
import Gtk from '../gtk';
import Element from './Element';

export default class Image extends Element {
  static propTypes = {
    file: PropTypes.string,
    gicon: PropTypes.object,
    iconName: PropTypes.string,
    iconSet: PropTypes.object,
    iconSize: PropTypes.number,
    pixbuf: PropTypes.object,
    pixbufAnimation: PropTypes.object,
    pixelSize: PropTypes.number,
    resource: PropTypes.string,
    stock: PropTypes.string,
    storageType: PropTypes.object,
    surface: PropTypes.object,
    useFallback: PropTypes.bool,
    xalign: PropTypes.number,
    xpad: PropTypes.number,
    yalign: PropTypes.number,
    ypad: PropTypes.number
  };

  static defaultProps = {
    file: null,
    gicon: null,
    iconName: null,
    iconSet: null,
    iconSize: null,
    pixbuf: null,
    pixbufAnimation: null,
    pixelSize: null,
    resource: null,
    stock: null,
    storageType: null,
    surface: null,
    useFallback: null,
    xalign: null,
    xpad: null,
    yalign: null,
    ypad: null
  };

  constructor(props: object = {}) {
    super(new Gtk.Image(), props);
  }

  clear(): null {
    return this.node.clear();
  }
}
