import PropTypes from 'prop-types';
import Gtk from '../gtk';
import Element from './Element';

export default class MenuButton extends Element {
  static propTypes = {
    alignWidget: PropTypes.object,
    direction: PropTypes.object,
    menuModel: PropTypes.object,
    popover: PropTypes.object,
    popup: PropTypes.object,
    usePopover: PropTypes.bool,
    active: PropTypes.bool,
    drawIndicator: PropTypes.bool,
    inconsistent: PropTypes.bool,
    alwaysShowImage: PropTypes.bool,
    image: PropTypes.object,
    imagePosition: PropTypes.object,
    label: PropTypes.string,
    relief: PropTypes.object,
    useStock: PropTypes.bool,
    useUnderline: PropTypes.bool,
    xalign: PropTypes.number,
    yalign: PropTypes.number,
    borderWidth: PropTypes.number,
    child: PropTypes.object,
    resizeMode: PropTypes.object
  };

  static defaultProps = {
    alignWidget: null,
    direction: null,
    menuModel: null,
    popover: null,
    popup: null,
    usePopover: null,
    active: null,
    drawIndicator: null,
    inconsistent: null,
    alwaysShowImage: null,
    image: null,
    imagePosition: null,
    label: null,
    relief: null,
    useStock: null,
    useUnderline: null,
    xalign: null,
    yalign: null,
    borderWidth: null,
    child: null,
    resizeMode: null
  };

  constructor(props: object = {}) {
    super(new Gtk.MenuButton(), props, { isContainer: true });
  }

  toggled(): null {
    return this.node.toggled();
  }

  clicked(): null {
    return this.node.clicked();
  }

  enter(): null {
    return this.node.enter();
  }

  leave(): null {
    return this.node.leave();
  }

  pressed(): null {
    return this.node.pressed();
  }

  released(): null {
    return this.node.released();
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
