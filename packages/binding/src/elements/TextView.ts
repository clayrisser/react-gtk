import PropTypes from 'prop-types';
import Gtk from '../gtk';
import Element from './Element';

export default class TextView extends Element {
  static propTypes = {
    acceptsTab: PropTypes.bool,
    bottomMargin: PropTypes.number,
    buffer: PropTypes.object,
    cursorVisible: PropTypes.bool,
    editable: PropTypes.bool,
    imModule: PropTypes.string,
    indent: PropTypes.number,
    inputHints: PropTypes.object,
    inputPurpose: PropTypes.object,
    justification: PropTypes.object,
    leftMargin: PropTypes.number,
    monospace: PropTypes.bool,
    overwrite: PropTypes.bool,
    pixelsAboveLines: PropTypes.number,
    pixelsBelowLines: PropTypes.number,
    pixelsInsideWrap: PropTypes.number,
    populateAll: PropTypes.bool,
    rightMargin: PropTypes.number,
    tabs: PropTypes.object,
    topMargin: PropTypes.number,
    wrapMode: PropTypes.object,
    borderWidth: PropTypes.number,
    child: PropTypes.object,
    resizeMode: PropTypes.object
  };

  static defaultProps = {
    acceptsTab: null,
    bottomMargin: null,
    buffer: null,
    cursorVisible: null,
    editable: null,
    imModule: null,
    indent: null,
    inputHints: null,
    inputPurpose: null,
    justification: null,
    leftMargin: null,
    monospace: null,
    overwrite: null,
    pixelsAboveLines: null,
    pixelsBelowLines: null,
    pixelsInsideWrap: null,
    populateAll: null,
    rightMargin: null,
    tabs: null,
    topMargin: null,
    wrapMode: null,
    borderWidth: null,
    child: null,
    resizeMode: null
  };

  constructor(props: object = {}) {
    super(new Gtk.TextView(), props, { isContainer: true });
  }

  addChildAtAnchor(child: object, anchor: object): null {
    return this.node.addChildAtAnchor(child, anchor);
  }

  addChildInWindow(
    child: object,
    whichWindow: object,
    xpos: number,
    ypos: number
  ): null {
    return this.node.addChildInWindow(child, whichWindow, xpos, ypos);
  }

  backwardDisplayLine(iter: object): boolean {
    return this.node.backwardDisplayLine(iter);
  }

  backwardDisplayLineStart(iter: object): boolean {
    return this.node.backwardDisplayLineStart(iter);
  }

  bufferToWindowCoords(
    win: object,
    bufferX: number,
    bufferY: number,
    windowX: number,
    windowY: number
  ): null {
    return this.node.bufferToWindowCoords(
      win,
      bufferX,
      bufferY,
      windowX,
      windowY
    );
  }

  forwardDisplayLine(iter: object): boolean {
    return this.node.forwardDisplayLine(iter);
  }

  forwardDisplayLineEnd(iter: object): boolean {
    return this.node.forwardDisplayLineEnd(iter);
  }

  imContextFilterKeypress(event: object): boolean {
    return this.node.imContextFilterKeypress(event);
  }

  moveChild(child: object, xpos: number, ypos: number): null {
    return this.node.moveChild(child, xpos, ypos);
  }

  moveMarkOnscreen(mark: object): boolean {
    return this.node.moveMarkOnscreen(mark);
  }

  moveVisually(iter: object, count: number): boolean {
    return this.node.moveVisually(iter, count);
  }

  placeCursorOnscreen(): boolean {
    return this.node.placeCursorOnscreen();
  }

  resetCursorBlink(): null {
    return this.node.resetCursorBlink();
  }

  resetImContext(): null {
    return this.node.resetImContext();
  }

  scrollMarkOnscreen(mark: object): null {
    return this.node.scrollMarkOnscreen(mark);
  }

  scrollToIter(
    iter: object,
    withinMargin: number,
    useAlign: boolean,
    xalign: number,
    yalign: number
  ): boolean {
    return this.node.scrollToIter(iter, withinMargin, useAlign, xalign, yalign);
  }

  scrollToMark(
    mark: object,
    withinMargin: number,
    useAlign: boolean,
    xalign: number,
    yalign: number
  ): null {
    return this.node.scrollToMark(mark, withinMargin, useAlign, xalign, yalign);
  }

  startsDisplayLine(iter: object): boolean {
    return this.node.startsDisplayLine(iter);
  }

  windowToBufferCoords(
    win: object,
    windowX: number,
    windowY: number,
    bufferX: number,
    bufferY: number
  ): null {
    return this.node.windowToBufferCoords(
      win,
      windowX,
      windowY,
      bufferX,
      bufferY
    );
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
