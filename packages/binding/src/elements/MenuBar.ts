import PropTypes from 'prop-types';
import Gtk from '../gtk';
import Element from './Element';

export default class MenuBar extends Element {
  static propTypes = {
    childPackDirection: PropTypes.object,
    packDirection: PropTypes.object,
    takeFocus: PropTypes.bool,
    borderWidth: PropTypes.number,
    child: PropTypes.object,
    resizeMode: PropTypes.object
  };

  static defaultProps = {
    childPackDirection: null,
    packDirection: null,
    takeFocus: null,
    borderWidth: null,
    child: null,
    resizeMode: null
  };

  constructor(props: object = {}) {
    super(new Gtk.MenuBar(), props, { isContainer: true });
  }

  activateItem(menuItem: object, forceDeactivate: boolean): null {
    return this.node.activateItem(menuItem, forceDeactivate);
  }

  append(child: object): null {
    return this.node.append(child);
  }

  bindModel(
    model: object,
    actionNamespace: string,
    withSeparators: boolean
  ): null {
    return this.node.bindModel(model, actionNamespace, withSeparators);
  }

  cancel(): null {
    return this.node.cancel();
  }

  deactivate(): null {
    return this.node.deactivate();
  }

  deselect(): null {
    return this.node.deselect();
  }

  insert(child: object, position: number): null {
    return this.node.insert(child, position);
  }

  prepend(child: object): null {
    return this.node.prepend(child);
  }

  selectFirst(searchSensitive: boolean): null {
    return this.node.selectFirst(searchSensitive);
  }

  selectItem(menuItem: object): null {
    return this.node.selectItem(menuItem);
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
