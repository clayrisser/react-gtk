import PropTypes from 'prop-types';
import Gtk from '../gtk';
import Element from './Element';

export default class ListBox extends Element {
  static propTypes = {
    activateOnSingleClick: PropTypes.bool,
    selectionMode: PropTypes.object,
    borderWidth: PropTypes.number,
    child: PropTypes.object,
    resizeMode: PropTypes.object
  };

  static defaultProps = {
    activateOnSingleClick: null,
    selectionMode: null,
    borderWidth: null,
    child: null,
    resizeMode: null
  };

  constructor(props: object = {}) {
    super(new Gtk.ListBox(), props, { isContainer: true });
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

  dragHighlightRow(row: object): null {
    return this.node.dragHighlightRow(row);
  }

  dragUnhighlightRow(): null {
    return this.node.dragUnhighlightRow();
  }

  insert(child: object, position: number): null {
    return this.node.insert(child, position);
  }

  invalidateFilter(): null {
    return this.node.invalidateFilter();
  }

  invalidateHeaders(): null {
    return this.node.invalidateHeaders();
  }

  invalidateSort(): null {
    return this.node.invalidateSort();
  }

  prepend(child: object): null {
    return this.node.prepend(child);
  }

  selectAll(): null {
    return this.node.selectAll();
  }

  selectRow(row: object): null {
    return this.node.selectRow(row);
  }

  selectedForeach(func: object, data: object): null {
    return this.node.selectedForeach(func, data);
  }

  unselectAll(): null {
    return this.node.unselectAll();
  }

  unselectRow(row: object): null {
    return this.node.unselectRow(row);
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
