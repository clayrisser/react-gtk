import PropTypes from 'prop-types';
import Gtk from '../gtk';
import Element from './Element';

export default class PlacesSidebar extends Element {
  static propTypes = {
    localOnly: PropTypes.bool,
    location: PropTypes.object,
    openFlags: PropTypes.object,
    populateAll: PropTypes.bool,
    showConnectToServer: PropTypes.bool,
    showDesktop: PropTypes.bool,
    showEnterLocation: PropTypes.bool,
    showOtherLocations: PropTypes.bool,
    showRecent: PropTypes.bool,
    showStarredLocation: PropTypes.bool,
    showTrash: PropTypes.bool,
    hadjustment: PropTypes.object,
    hscrollbarPolicy: PropTypes.object,
    kineticScrolling: PropTypes.bool,
    maxContentHeight: PropTypes.number,
    maxContentWidth: PropTypes.number,
    minContentHeight: PropTypes.number,
    minContentWidth: PropTypes.number,
    overlayScrolling: PropTypes.bool,
    propagateNaturalHeight: PropTypes.bool,
    propagateNaturalWidth: PropTypes.bool,
    shadowType: PropTypes.object,
    vadjustment: PropTypes.object,
    vscrollbarPolicy: PropTypes.object,
    windowPlacement: PropTypes.object,
    windowPlacementSet: PropTypes.bool,
    borderWidth: PropTypes.number,
    child: PropTypes.object,
    resizeMode: PropTypes.object
  };

  static defaultProps = {
    localOnly: null,
    location: null,
    openFlags: null,
    populateAll: null,
    showConnectToServer: null,
    showDesktop: null,
    showEnterLocation: null,
    showOtherLocations: null,
    showRecent: null,
    showStarredLocation: null,
    showTrash: null,
    hadjustment: null,
    hscrollbarPolicy: null,
    kineticScrolling: null,
    maxContentHeight: null,
    maxContentWidth: null,
    minContentHeight: null,
    minContentWidth: null,
    overlayScrolling: null,
    propagateNaturalHeight: null,
    propagateNaturalWidth: null,
    shadowType: null,
    vadjustment: null,
    vscrollbarPolicy: null,
    windowPlacement: null,
    windowPlacementSet: null,
    borderWidth: null,
    child: null,
    resizeMode: null
  };

  constructor(props: object = {}) {
    super(new Gtk.PlacesSidebar(), props, { isContainer: true });
  }

  addShortcut(location: object): null {
    return this.node.addShortcut(location);
  }

  listShortcuts(): string[] {
    return this.node.listShortcuts();
  }

  removeShortcut(location: object): null {
    return this.node.removeShortcut(location);
  }

  addWithViewport(child: object): null {
    return this.node.addWithViewport(child);
  }

  unsetPlacement(): null {
    return this.node.unsetPlacement();
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
