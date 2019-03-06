import PropTypes from 'prop-types';
import Gtk from '../gtk';
import Element from './Element';

export default class Menu extends Element {
  static propTypes = {
    accelGroup: PropTypes.object,
    accelPath: PropTypes.string,
    active: PropTypes.number,
    anchorHints: PropTypes.object,
    attachWidget: PropTypes.object,
    menuTypeHint: PropTypes.object,
    monitor: PropTypes.number,
    rectAnchorDx: PropTypes.number,
    rectAnchorDy: PropTypes.number,
    reserveToggleSize: PropTypes.bool,
    tearoffState: PropTypes.bool,
    tearoffTitle: PropTypes.string,
    takeFocus: PropTypes.bool,
    borderWidth: PropTypes.number,
    child: PropTypes.object,
    resizeMode: PropTypes.object
  };

  static defaultProps = {
    accelGroup: null,
    accelPath: null,
    active: null,
    anchorHints: null,
    attachWidget: null,
    menuTypeHint: null,
    monitor: null,
    rectAnchorDx: null,
    rectAnchorDy: null,
    reserveToggleSize: null,
    tearoffState: null,
    tearoffTitle: null,
    takeFocus: null,
    borderWidth: null,
    child: null,
    resizeMode: null
  };

  constructor(props: object = {}) {
    super(new Gtk.Menu(), props, { isContainer: true });
  }

  attach(
    child: object,
    leftAttach: number,
    rightAttach: number,
    topAttach: number,
    bottomAttach: number
  ): null {
    return this.node.attach(
      child,
      leftAttach,
      rightAttach,
      topAttach,
      bottomAttach
    );
  }

  attachToWidget(attachWidget: object, detacher: object): null {
    return this.node.attachToWidget(attachWidget, detacher);
  }

  detach(): null {
    return this.node.detach();
  }

  placeOnMonitor(monitor: object): null {
    return this.node.placeOnMonitor(monitor);
  }

  popdown(): null {
    return this.node.popdown();
  }

  popup(
    parentMenuShell: object,
    parentMenuItem: object,
    func: object,
    data: object,
    button: number,
    activateTime: number
  ): null {
    return this.node.popup(
      parentMenuShell,
      parentMenuItem,
      func,
      data,
      button,
      activateTime
    );
  }

  popupAtPointer(triggerEvent: object): null {
    return this.node.popupAtPointer(triggerEvent);
  }

  popupAtRect(
    rectWindow: object,
    rect: object,
    rectAnchor: object,
    menuAnchor: object,
    triggerEvent: object
  ): null {
    return this.node.popupAtRect(
      rectWindow,
      rect,
      rectAnchor,
      menuAnchor,
      triggerEvent
    );
  }

  popupAtWidget(
    widget: object,
    widgetAnchor: object,
    menuAnchor: object,
    triggerEvent: object
  ): null {
    return this.node.popupAtWidget(
      widget,
      widgetAnchor,
      menuAnchor,
      triggerEvent
    );
  }

  popupForDevice(
    device: object,
    parentMenuShell: object,
    parentMenuItem: object,
    func: object,
    data: object,
    destroy: object,
    button: number,
    activateTime: number
  ): null {
    return this.node.popupForDevice(
      device,
      parentMenuShell,
      parentMenuItem,
      func,
      data,
      destroy,
      button,
      activateTime
    );
  }

  reorderChild(child: object, position: number): null {
    return this.node.reorderChild(child, position);
  }

  reposition(): null {
    return this.node.reposition();
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
