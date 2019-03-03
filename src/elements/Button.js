import PropTypes from 'prop-types';
import Gtk from '../gtk';
import Element from './Element';

export default class Button extends Element {
  static propTypes = {
    alwaysShowImage: PropTypes.bool,
    image: PropTypes.object,
    imagePosition: PropTypes.number,
    label: PropTypes.string,
    relief: PropTypes.number,
    useStock: PropTypes.bool,
    useUnderline: PropTypes.bool,
    xalign: PropTypes.number,
    yalign: PropTypes.number,
    actionName: PropTypes.string,
    relatedAction: PropTypes.object,
    useActionAppearance: PropTypes.bool
  };

  static defaultProps = {
    alwaysShowImage: null,
    image: null,
    imagePosition: null,
    label: null,
    relief: null,
    useStock: null,
    useUnderline: null,
    xalign: null,
    yalign: null,
    actionName: null,
    actionTarget: null,
    relatedAction: null,
    useActionAppearance: null
  };

  constructor(props = {}) {
    super(new Gtk.Button(), props, { isContainer: true });
  }

  pressed(...props) {
    this.node.pressed(...props);
  }

  released(...props) {
    this.node.released(...props);
  }

  clicked(...props) {
    this.node.clicked(...props);
  }

  enter(...props) {
    this.node.enter(...props);
  }

  leave(...props) {
    this.node.leave(...props);
  }
}
