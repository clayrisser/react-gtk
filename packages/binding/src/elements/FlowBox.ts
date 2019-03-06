import PropTypes from 'prop-types';
import Gtk from '../gtk';
import Element from './Element';

export default class FlowBox extends Element {
  static propTypes = {
    activateOnSingleClick: PropTypes.bool,
    columnSpacing: PropTypes.number,
    homogeneous: PropTypes.bool,
    maxChildrenPerLine: PropTypes.number,
    minChildrenPerLine: PropTypes.number,
    rowSpacing: PropTypes.number,
    selectionMode: PropTypes.object,
    borderWidth: PropTypes.number,
    child: PropTypes.object,
    resizeMode: PropTypes.object
  };

  static defaultProps = {
    activateOnSingleClick: null,
    columnSpacing: null,
    homogeneous: null,
    maxChildrenPerLine: null,
    minChildrenPerLine: null,
    rowSpacing: null,
    selectionMode: null,
    borderWidth: null,
    child: null,
    resizeMode: null
  };

  constructor(props: object = {}) {
    super(new Gtk.FlowBox(), props, { isContainer: true });
  }

  bindModel(
    model: object,
    createWidgetFunc: object,
    userData: object,
    userDataFreeFunc: object
  ): null {
    return this.node.bindModel(
      model,
      createWidgetFunc,
      userData,
      userDataFreeFunc
    );
  }

  insert(widget: object, position: number): null {
    return this.node.insert(widget, position);
  }

  invalidateFilter(): null {
    return this.node.invalidateFilter();
  }

  invalidateSort(): null {
    return this.node.invalidateSort();
  }

  selectAll(): null {
    return this.node.selectAll();
  }

  selectChild(child: object): null {
    return this.node.selectChild(child);
  }

  selectedForeach(func: object, data: object): null {
    return this.node.selectedForeach(func, data);
  }

  unselectAll(): null {
    return this.node.unselectAll();
  }

  unselectChild(child: object): null {
    return this.node.unselectChild(child);
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
