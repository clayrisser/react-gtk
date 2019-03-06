import PropTypes from 'prop-types';
import Gtk from '../gtk';
import Element from './Element';

export default class CheckMenuItem extends Element {
  static propTypes = {
    active: PropTypes.bool,
    drawAsRadio: PropTypes.bool,
    inconsistent: PropTypes.bool,
    accelPath: PropTypes.string,
    label: PropTypes.string,
    rightJustified: PropTypes.bool,
    submenu: PropTypes.object,
    useUnderline: PropTypes.bool,
    borderWidth: PropTypes.number,
    child: PropTypes.object,
    resizeMode: PropTypes.object
  };

  static defaultProps = {
    active: null,
    drawAsRadio: null,
    inconsistent: null,
    accelPath: null,
    label: null,
    rightJustified: null,
    submenu: null,
    useUnderline: null,
    borderWidth: null,
    child: null,
    resizeMode: null
  };

  constructor(props: object = {}) {
    super(new Gtk.CheckMenuItem(), props, { isContainer: true });
  }

  toggled(): null {
    return this.node.toggled();
  }

  activate(): null {
    return this.node.activate();
  }

  deselect(): null {
    return this.node.deselect();
  }

  select(): null {
    return this.node.select();
  }

  toggleSizeAllocate(allocation: number): null {
    return this.node.toggleSizeAllocate(allocation);
  }

  toggleSizeRequest(requisition: number): null {
    return this.node.toggleSizeRequest(requisition);
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
