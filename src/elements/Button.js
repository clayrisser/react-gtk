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
    console.log('static propTypes = {');
    Object.keys(Object.getPrototypeOf(this.node)).forEach(key => {
      if (key === 'actionTarget') return;
      let type = typeof this.node[key];
      if (type === 'function') type = 'func';
      if (type === 'boolean') type = 'bool';
      if (type === 'object') {
        type = Array.isArray(this.node[key]) ? 'array' : 'object';
      }
      console.log(`${key}: PropTypes.${type},`);
    });
    console.log('}\n\nstatic defaultProps = {');
    Object.keys(Object.getPrototypeOf(this.node)).forEach(key => {
      console.log(`${key}: null,`);
    });
    console.log('\n}');
  }
}
