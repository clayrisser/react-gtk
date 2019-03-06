import PropTypes from 'prop-types';
import Gtk from '../gtk';
import Element from './Element';

export default class IconView extends Element {
  static propTypes = {
    activateOnSingleClick: PropTypes.bool,
    cellArea: PropTypes.object,
    columnSpacing: PropTypes.number,
    columns: PropTypes.number,
    itemOrientation: PropTypes.object,
    itemPadding: PropTypes.number,
    itemWidth: PropTypes.number,
    margin: PropTypes.number,
    markupColumn: PropTypes.number,
    model: PropTypes.object,
    pixbufColumn: PropTypes.number,
    reorderable: PropTypes.bool,
    rowSpacing: PropTypes.number,
    selectionMode: PropTypes.object,
    spacing: PropTypes.number,
    textColumn: PropTypes.number,
    tooltipColumn: PropTypes.number,
    borderWidth: PropTypes.number,
    child: PropTypes.object,
    resizeMode: PropTypes.object
  };

  static defaultProps = {
    activateOnSingleClick: null,
    cellArea: null,
    columnSpacing: null,
    columns: null,
    itemOrientation: null,
    itemPadding: null,
    itemWidth: null,
    margin: null,
    markupColumn: null,
    model: null,
    pixbufColumn: null,
    reorderable: null,
    rowSpacing: null,
    selectionMode: null,
    spacing: null,
    textColumn: null,
    tooltipColumn: null,
    borderWidth: null,
    child: null,
    resizeMode: null
  };

  constructor(props: object = {}) {
    super(new Gtk.IconView(), props, { isContainer: true });
  }

  convertWidgetToBinWindowCoords(
    wx: number,
    wy: number,
    bx: number,
    by: number
  ): null {
    return this.node.convertWidgetToBinWindowCoords(wx, wy, bx, by);
  }

  createDragIcon(path: object): object {
    return this.node.createDragIcon(path);
  }

  enableModelDragDest(
    targets: object[],
    nTargets: number,
    actions: object
  ): null {
    return this.node.enableModelDragDest(targets, nTargets, actions);
  }

  enableModelDragSource(
    startButtonMask: object,
    targets: object[],
    nTargets: number,
    actions: object
  ): null {
    return this.node.enableModelDragSource(
      startButtonMask,
      targets,
      nTargets,
      actions
    );
  }

  itemActivated(path: object): null {
    return this.node.itemActivated(path);
  }

  pathIsSelected(path: object): boolean {
    return this.node.pathIsSelected(path);
  }

  scrollToPath(
    path: object,
    useAlign: boolean,
    rowAlign: number,
    colAlign: number
  ): null {
    return this.node.scrollToPath(path, useAlign, rowAlign, colAlign);
  }

  selectAll(): null {
    return this.node.selectAll();
  }

  selectPath(path: object): null {
    return this.node.selectPath(path);
  }

  selectedForeach(func: object, data: object): null {
    return this.node.selectedForeach(func, data);
  }

  unselectAll(): null {
    return this.node.unselectAll();
  }

  unselectPath(path: object): null {
    return this.node.unselectPath(path);
  }

  unsetModelDragDest(): null {
    return this.node.unsetModelDragDest();
  }

  unsetModelDragSource(): null {
    return this.node.unsetModelDragSource();
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
