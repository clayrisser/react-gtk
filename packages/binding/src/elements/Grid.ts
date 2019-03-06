import PropTypes from 'prop-types';
import Gtk from '../gtk';
import Element from './Element';

export default class Grid extends Element {
  static propTypes = {
    baselineRow: PropTypes.number,
    columnHomogeneous: PropTypes.bool,
    columnSpacing: PropTypes.number,
    rowHomogeneous: PropTypes.bool,
    rowSpacing: PropTypes.number,
    borderWidth: PropTypes.number,
    child: PropTypes.object,
    resizeMode: PropTypes.object
  };

  static defaultProps = {
    baselineRow: null,
    columnHomogeneous: null,
    columnSpacing: null,
    rowHomogeneous: null,
    rowSpacing: null,
    borderWidth: null,
    child: null,
    resizeMode: null
  };

  constructor(props: object = {}) {
    super(new Gtk.Grid(), props, { isContainer: true });
  }

  attach(
    child: object,
    left: number,
    top: number,
    width: number,
    height: number
  ): null {
    return this.node.attach(child, left, top, width, height);
  }

  attachNextTo(
    child: object,
    sibling: object,
    side: object,
    width: number,
    height: number
  ): null {
    return this.node.attachNextTo(child, sibling, side, width, height);
  }

  insertColumn(position: number): null {
    return this.node.insertColumn(position);
  }

  insertNextTo(sibling: object, side: object): null {
    return this.node.insertNextTo(sibling, side);
  }

  insertRow(position: number): null {
    return this.node.insertRow(position);
  }

  removeColumn(position: number): null {
    return this.node.removeColumn(position);
  }

  removeRow(position: number): null {
    return this.node.removeRow(position);
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
