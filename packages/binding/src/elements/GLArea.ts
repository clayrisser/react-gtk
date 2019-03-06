import PropTypes from 'prop-types';
import Gtk from '../gtk';
import Element from './Element';

export default class GLArea extends Element {
  static propTypes = {
    autoRender: PropTypes.bool,
    context: PropTypes.object,
    hasAlpha: PropTypes.bool,
    hasDepthBuffer: PropTypes.bool,
    hasStencilBuffer: PropTypes.bool,
    useEs: PropTypes.bool
  };

  static defaultProps = {
    autoRender: null,
    context: null,
    hasAlpha: null,
    hasDepthBuffer: null,
    hasStencilBuffer: null,
    useEs: null
  };

  constructor(props: object = {}) {
    super(new Gtk.GLArea(), props);
  }

  attachBuffers(): null {
    return this.node.attachBuffers();
  }

  makeCurrent(): null {
    return this.node.makeCurrent();
  }

  queueRender(): null {
    return this.node.queueRender();
  }
}
