import PropTypes from 'prop-types';
import Gtk from '../gtk';
import Element from './Element';

export default class Window extends Element {
  static propTypes = {
    acceptFocus: PropTypes.bool,
    application: PropTypes.object,
    attachedTo: PropTypes.object,
    decorated: PropTypes.bool,
    defaultHeight: PropTypes.number,
    defaultWidth: PropTypes.number,
    deletable: PropTypes.bool,
    destroyWithParent: PropTypes.bool,
    focusOnMap: PropTypes.bool,
    focusVisible: PropTypes.bool,
    gravity: PropTypes.number,
    hasResizeGrip: PropTypes.bool,
    hasToplevelFocus: PropTypes.func,
    hideTitlebarWhenMaximized: PropTypes.bool,
    icon: PropTypes.object,
    iconName: PropTypes.string,
    isActive: PropTypes.func,
    isMaximized: PropTypes.func,
    mnemonicsVisible: PropTypes.bool,
    modal: PropTypes.bool,
    resizable: PropTypes.bool,
    resizeGripVisible: PropTypes.bool,
    role: PropTypes.string,
    skipPagerHint: PropTypes.bool,
    skipTaskbarHint: PropTypes.bool,
    startupId: PropTypes.string,
    title: PropTypes.string,
    transientFor: PropTypes.object,
    type: PropTypes.number,
    typeHint: PropTypes.number,
    urgencyHint: PropTypes.bool,
    windowPosition: PropTypes.number
  };

  static defaultProps = {
    acceptFocus: null,
    application: null,
    attachedTo: null,
    decorated: null,
    defaultHeight: null,
    defaultWidth: null,
    deletable: null,
    destroyWithParent: null,
    focusOnMap: null,
    focusVisible: null,
    gravity: null,
    hasResizeGrip: null,
    hasToplevelFocus: null,
    hideTitlebarWhenMaximized: null,
    icon: null,
    iconName: null,
    isActive: null,
    isMaximized: null,
    mnemonicsVisible: null,
    modal: null,
    resizable: null,
    resizeGripVisible: null,
    role: null,
    screen: null,
    skipPagerHint: null,
    skipTaskbarHint: null,
    startupId: null,
    title: null,
    transientFor: null,
    type: null,
    typeHint: null,
    urgencyHint: null,
    windowPosition: null
  };

  constructor(props = {}) {
    super(
      new Gtk.Window({
        type: Gtk.WindowType.TOPLEVEL,
        title: props.title || 'React Gtk'
      }),
      props,
      { isContainer: true }
    );
  }
}
