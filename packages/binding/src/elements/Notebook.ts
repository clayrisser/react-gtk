import PropTypes from 'prop-types';
import Gtk from '../gtk';
import Element from './Element';

export default class Notebook extends Element {
  static propTypes = {
    enablePopup: PropTypes.bool,
    groupName: PropTypes.string,
    page: PropTypes.number,
    scrollable: PropTypes.bool,
    showBorder: PropTypes.bool,
    showTabs: PropTypes.bool,
    tabPos: PropTypes.object,
    borderWidth: PropTypes.number,
    child: PropTypes.object,
    resizeMode: PropTypes.object
  };

  static defaultProps = {
    enablePopup: null,
    groupName: null,
    page: null,
    scrollable: null,
    showBorder: null,
    showTabs: null,
    tabPos: null,
    borderWidth: null,
    child: null,
    resizeMode: null
  };

  constructor(props: object = {}) {
    super(new Gtk.Notebook(), props, { isContainer: true });
  }

  appendPage(child: object, tabLabel: object): number {
    return this.node.appendPage(child, tabLabel);
  }

  appendPageMenu(child: object, tabLabel: object, menuLabel: object): number {
    return this.node.appendPageMenu(child, tabLabel, menuLabel);
  }

  detachTab(child: object): null {
    return this.node.detachTab(child);
  }

  insertPage(child: object, tabLabel: object, position: number): number {
    return this.node.insertPage(child, tabLabel, position);
  }

  insertPageMenu(
    child: object,
    tabLabel: object,
    menuLabel: object,
    position: number
  ): number {
    return this.node.insertPageMenu(child, tabLabel, menuLabel, position);
  }

  nextPage(): null {
    return this.node.nextPage();
  }

  pageNum(child: object): number {
    return this.node.pageNum(child);
  }

  popupDisable(): null {
    return this.node.popupDisable();
  }

  popupEnable(): null {
    return this.node.popupEnable();
  }

  prependPage(child: object, tabLabel: object): number {
    return this.node.prependPage(child, tabLabel);
  }

  prependPageMenu(child: object, tabLabel: object, menuLabel: object): number {
    return this.node.prependPageMenu(child, tabLabel, menuLabel);
  }

  prevPage(): null {
    return this.node.prevPage();
  }

  removePage(pageNum: number): null {
    return this.node.removePage(pageNum);
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
