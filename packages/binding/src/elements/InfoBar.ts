import PropTypes from 'prop-types';
import Gtk from '../gtk';
import Element from './Element';

export default class InfoBar extends Element {
  static propTypes = {
    messageType: PropTypes.object,
    revealed: PropTypes.bool,
    showCloseButton: PropTypes.bool,
    baselinePosition: PropTypes.object,
    homogeneous: PropTypes.bool,
    spacing: PropTypes.number,
    borderWidth: PropTypes.number,
    child: PropTypes.object,
    resizeMode: PropTypes.object
  };

  static defaultProps = {
    messageType: null,
    revealed: null,
    showCloseButton: null,
    baselinePosition: null,
    homogeneous: null,
    spacing: null,
    borderWidth: null,
    child: null,
    resizeMode: null
  };

  constructor(props: object = {}) {
    super(new Gtk.InfoBar(), props, { isContainer: true });
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
