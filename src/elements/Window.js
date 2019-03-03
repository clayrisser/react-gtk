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

  addAccelGroup(...props) {
    this.node.addAccelGroup(...props);
  }

  removeAccelGroup(...props) {
    this.node.removeAccelGroup(...props);
  }

  activateFocus(...props) {
    this.node.activateFocus(...props);
  }

  activateDefault(...props) {
    this.node.activateDefault(...props);
  }

  isActive(...props) {
    this.node.isActive(...props);
  }

  isMaximized(...props) {
    this.node.isMaximized(...props);
  }

  hasToplevelFocus(...props) {
    this.node.hasToplevelFocus(...props);
  }

  listToplevels(...props) {
    this.node.listToplevels(...props);
  }

  addMnemonic(...props) {
    this.node.addMnemonic(...props);
  }

  removeMnemonic(...props) {
    this.node.removeMnemonic(...props);
  }

  mnemonicActivate(...props) {
    this.node.mnemonicActivate(...props);
  }

  activateKey(...props) {
    this.node.activateKey(...props);
  }

  propagateKeyEvent(...props) {
    this.node.propagateKeyEvent(...props);
  }

  present(...props) {
    this.node.present(...props);
  }

  presentWithTime(...props) {
    this.node.presentWithTime(...props);
  }

  close(...props) {
    this.node.close(...props);
  }

  iconify(...props) {
    this.node.iconify(...props);
  }

  deiconify(...props) {
    this.node.deiconify(...props);
  }

  stick(...props) {
    this.node.stick(...props);
  }

  unstick(...props) {
    this.node.unstick(...props);
  }

  maximize(...props) {
    this.node.maximize(...props);
  }

  unmaximize(...props) {
    this.node.unmaximize(...props);
  }

  fullscreen(...props) {
    this.node.fullscreen(...props);
  }

  fullscreenOnMonitor(...props) {
    this.node.fullscreenOnMonitor(...props);
  }

  unfullscreen(...props) {
    this.node.unfullscreen(...props);
  }

  beginResizeDrag(...props) {
    this.node.beginResizeDrag(...props);
  }

  beginMoveDrag(...props) {
    this.node.beginMoveDrag(...props);
  }

  hasGroup(...props) {
    this.node.hasGroup(...props);
  }

  move(...props) {
    this.node.move(...props);
  }

  parseGeometry(...props) {
    this.node.parseGeometry(...props);
  }

  reshowWithInitialSize(...props) {
    this.node.reshowWithInitialSize(...props);
  }

  resize(...props) {
    this.node.resize(...props);
  }

  resizeToGeometry(...props) {
    this.node.resizeToGeometry(...props);
  }

  resizeGripIsVisible(...props) {
    this.node.resizeGripIsVisible(...props);
  }
}
