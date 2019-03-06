import PropTypes from 'prop-types';
import Gtk from '../gtk';
import Element from './Element';

export default class Table extends Element {
  static propTypes = {
    columnSpacing: PropTypes.number,
    homogeneous: PropTypes.bool,
    nColumns: PropTypes.number,
    nRows: PropTypes.number,
    rowSpacing: PropTypes.number,
    borderWidth: PropTypes.number,
    child: PropTypes.object,
    resizeMode: PropTypes.object
  };

  static defaultProps = {
    columnSpacing: null,
    homogeneous: null,
    nColumns: null,
    nRows: null,
    rowSpacing: null,
    borderWidth: null,
    child: null,
    resizeMode: null
  };

  constructor(props: object = {}) {
    super(new Gtk.Table(), props, { isContainer: true });
  }

  attach(
    child: object,
    leftAttach: number,
    rightAttach: number,
    topAttach: number,
    bottomAttach: number,
    xoptions: object,
    yoptions: object,
    xpadding: number,
    ypadding: number
  ): null {
    return this.node.attach(
      child,
      leftAttach,
      rightAttach,
      topAttach,
      bottomAttach,
      xoptions,
      yoptions,
      xpadding,
      ypadding
    );
  }

  attachDefaults(
    widget: object,
    leftAttach: number,
    rightAttach: number,
    topAttach: number,
    bottomAttach: number
  ): null {
    return this.node.attachDefaults(
      widget,
      leftAttach,
      rightAttach,
      topAttach,
      bottomAttach
    );
  }

  resize(rows: number, columns: number): null {
    return this.node.resize(rows, columns);
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
