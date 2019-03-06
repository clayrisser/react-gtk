import PropTypes from 'prop-types';
import Gtk from '../gtk';
import Element from './Element';

export default class AppChooserDialog extends Element {
  static propTypes = {
    gfile: PropTypes.object,
    heading: PropTypes.string,
    useHeaderBar: PropTypes.number,
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
    gravity: PropTypes.object,
    hasResizeGrip: PropTypes.bool,
    hasToplevelFocus: PropTypes.bool,
    hideTitlebarWhenMaximized: PropTypes.bool,
    icon: PropTypes.object,
    iconName: PropTypes.string,
    isActive: PropTypes.bool,
    isMaximized: PropTypes.bool,
    mnemonicsVisible: PropTypes.bool,
    modal: PropTypes.bool,
    resizable: PropTypes.bool,
    resizeGripVisible: PropTypes.bool,
    role: PropTypes.string,
    screen: PropTypes.object,
    skipPagerHint: PropTypes.bool,
    skipTaskbarHint: PropTypes.bool,
    startupId: PropTypes.string,
    title: PropTypes.string,
    transientFor: PropTypes.object,
    type: PropTypes.object,
    typeHint: PropTypes.object,
    urgencyHint: PropTypes.bool,
    windowPosition: PropTypes.object,
    borderWidth: PropTypes.number,
    child: PropTypes.object,
    resizeMode: PropTypes.object
  };

  static defaultProps = {
    gfile: null,
    heading: null,
    useHeaderBar: null,
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
    windowPosition: null,
    borderWidth: null,
    child: null,
    resizeMode: null
  };

  constructor(props: object = {}) {
    super(new Gtk.AppChooserDialog(), props, { isContainer: true });
  }

  addActionWidget(child: object, responseId: object): null {
    return this.node.addActionWidget(child, responseId);
  }

  addButton(buttonText: string, responseId: object): object {
    return this.node.addButton(buttonText, responseId);
  }

  addButtons(firstButtonText: string, ___: object): null {
    return this.node.addButtons(firstButtonText, ___);
  }

  response(responseId: object): null {
    return this.node.response(responseId);
  }

  run(): number {
    return this.node.run();
  }

  activateDefault(): boolean {
    return this.node.activateDefault();
  }

  activateFocus(): boolean {
    return this.node.activateFocus();
  }

  activateKey(event: object): boolean {
    return this.node.activateKey(event);
  }

  addAccelGroup(accelGroup: object): null {
    return this.node.addAccelGroup(accelGroup);
  }

  addMnemonic(keyval: number, target: object): null {
    return this.node.addMnemonic(keyval, target);
  }

  beginMoveDrag(
    button: number,
    rootX: number,
    rootY: number,
    timestamp: number
  ): null {
    return this.node.beginMoveDrag(button, rootX, rootY, timestamp);
  }

  beginResizeDrag(
    edge: object,
    button: number,
    rootX: number,
    rootY: number,
    timestamp: number
  ): null {
    return this.node.beginResizeDrag(edge, button, rootX, rootY, timestamp);
  }

  close(): null {
    return this.node.close();
  }

  deiconify(): null {
    return this.node.deiconify();
  }

  fullscreen(): null {
    return this.node.fullscreen();
  }

  fullscreenOnMonitor(screen: object, monitor: number): null {
    return this.node.fullscreenOnMonitor(screen, monitor);
  }

  hasGroup(): boolean {
    return this.node.hasGroup();
  }

  hasToplevelFocus(): boolean {
    return this.node.hasToplevelFocus();
  }

  iconify(): null {
    return this.node.iconify();
  }

  isActive(): boolean {
    return this.node.isActive();
  }

  isMaximized(): boolean {
    return this.node.isMaximized();
  }

  maximize(): null {
    return this.node.maximize();
  }

  mnemonicActivate(keyval: number, modifier: object): boolean {
    return this.node.mnemonicActivate(keyval, modifier);
  }

  move(x: number, y: number): null {
    return this.node.move(x, y);
  }

  parseGeometry(geometry: string): boolean {
    return this.node.parseGeometry(geometry);
  }

  present(): null {
    return this.node.present();
  }

  presentWithTime(timestamp: number): null {
    return this.node.presentWithTime(timestamp);
  }

  propagateKeyEvent(event: object): boolean {
    return this.node.propagateKeyEvent(event);
  }

  removeAccelGroup(accelGroup: object): null {
    return this.node.removeAccelGroup(accelGroup);
  }

  removeMnemonic(keyval: number, target: object): null {
    return this.node.removeMnemonic(keyval, target);
  }

  reshowWithInitialSize(): null {
    return this.node.reshowWithInitialSize();
  }

  resize(width: number, height: number): null {
    return this.node.resize(width, height);
  }

  resizeGripIsVisible(): boolean {
    return this.node.resizeGripIsVisible();
  }

  resizeToGeometry(width: number, height: number): null {
    return this.node.resizeToGeometry(width, height);
  }

  stick(): null {
    return this.node.stick();
  }

  unfullscreen(): null {
    return this.node.unfullscreen();
  }

  unmaximize(): null {
    return this.node.unmaximize();
  }

  unstick(): null {
    return this.node.unstick();
  }

  add(widget: object): null {
    return this.node.add(widget);
  }

  addWithProperties(widget: object, firstPropName: string, ___: object): null {
    return this.node.addWithProperties(widget, firstPropName, ___);
  }

  checkResize(): null {
    return this.node.checkResize();
  }

  childGet(child: object, firstPropName: string, ___: object): null {
    return this.node.childGet(child, firstPropName, ___);
  }

  childGetProperty(child: object, propertyName: string, value: object): null {
    return this.node.childGetProperty(child, propertyName, value);
  }

  childGetValist(
    child: object,
    firstPropertyName: string,
    varArgs: object
  ): null {
    return this.node.childGetValist(child, firstPropertyName, varArgs);
  }

  childNotify(child: object, childProperty: string): null {
    return this.node.childNotify(child, childProperty);
  }

  childNotifyByPspec(child: object, pspec: object): null {
    return this.node.childNotifyByPspec(child, pspec);
  }

  childSet(child: object, firstPropName: string, ___: object): null {
    return this.node.childSet(child, firstPropName, ___);
  }

  childSetProperty(child: object, propertyName: string, value: object): null {
    return this.node.childSetProperty(child, propertyName, value);
  }

  childSetValist(
    child: object,
    firstPropertyName: string,
    varArgs: object
  ): null {
    return this.node.childSetValist(child, firstPropertyName, varArgs);
  }

  childType(): object {
    return this.node.childType();
  }

  forall(callback: object, callbackData: object): null {
    return this.node.forall(callback, callbackData);
  }

  foreach(callback: object, callbackData: object): null {
    return this.node.foreach(callback, callbackData);
  }

  propagateDraw(child: object, cr: object): null {
    return this.node.propagateDraw(child, cr);
  }

  remove(widget: object): null {
    return this.node.remove(widget);
  }

  resizeChildren(): null {
    return this.node.resizeChildren();
  }

  unsetFocusChain(): null {
    return this.node.unsetFocusChain();
  }
}
