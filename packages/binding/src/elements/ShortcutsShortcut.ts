import PropTypes from 'prop-types';
import Gtk from '../gtk';
import Element from './Element';

export default class ShortcutsShortcut extends Element {
  static propTypes = {
    accelSizeGroup: PropTypes.object,
    accelerator: PropTypes.string,
    actionName: PropTypes.string,
    direction: PropTypes.object,
    icon: PropTypes.object,
    iconSet: PropTypes.bool,
    shortcutType: PropTypes.object,
    subtitle: PropTypes.string,
    subtitleSet: PropTypes.bool,
    title: PropTypes.string,
    titleSizeGroup: PropTypes.object,
    baselinePosition: PropTypes.object,
    homogeneous: PropTypes.bool,
    spacing: PropTypes.number,
    borderWidth: PropTypes.number,
    child: PropTypes.object,
    resizeMode: PropTypes.object
  };

  static defaultProps = {
    accelSizeGroup: null,
    accelerator: null,
    actionName: null,
    direction: null,
    icon: null,
    iconSet: null,
    shortcutType: null,
    subtitle: null,
    subtitleSet: null,
    title: null,
    titleSizeGroup: null,
    baselinePosition: null,
    homogeneous: null,
    spacing: null,
    borderWidth: null,
    child: null,
    resizeMode: null
  };

  constructor(props: object = {}) {
    super(new Gtk.ShortcutsShortcut(), props, { isContainer: true });
  }

  packEnd(
    child: object,
    expand: boolean,
    fill: boolean,
    padding: number
  ): null {
    return this.node.packEnd(child, expand, fill, padding);
  }

  packStart(
    child: object,
    expand: boolean,
    fill: boolean,
    padding: number
  ): null {
    return this.node.packStart(child, expand, fill, padding);
  }

  queryChildPacking(
    child: object,
    expand: boolean,
    fill: boolean,
    padding: number,
    packType: object
  ): null {
    return this.node.queryChildPacking(child, expand, fill, padding, packType);
  }

  reorderChild(child: object, position: number): null {
    return this.node.reorderChild(child, position);
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
