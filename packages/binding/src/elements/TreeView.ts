import PropTypes from 'prop-types';
import Gtk from '../gtk';
import Element from './Element';

export default class TreeView extends Element {
  static propTypes = {
    activateOnSingleClick: PropTypes.bool,
    enableGridLines: PropTypes.object,
    enableSearch: PropTypes.bool,
    enableTreeLines: PropTypes.bool,
    expanderColumn: PropTypes.object,
    fixedHeightMode: PropTypes.bool,
    headersClickable: PropTypes.bool,
    headersVisible: PropTypes.bool,
    hoverExpand: PropTypes.bool,
    hoverSelection: PropTypes.bool,
    levelIndentation: PropTypes.number,
    model: PropTypes.object,
    reorderable: PropTypes.bool,
    rubberBanding: PropTypes.bool,
    rulesHint: PropTypes.bool,
    searchColumn: PropTypes.number,
    showExpanders: PropTypes.bool,
    tooltipColumn: PropTypes.number,
    ubuntuAlmostFixedHeightMode: PropTypes.bool,
    borderWidth: PropTypes.number,
    child: PropTypes.object,
    resizeMode: PropTypes.object
  };

  static defaultProps = {
    activateOnSingleClick: null,
    enableGridLines: null,
    enableSearch: null,
    enableTreeLines: null,
    expanderColumn: null,
    fixedHeightMode: null,
    headersClickable: null,
    headersVisible: null,
    hoverExpand: null,
    hoverSelection: null,
    levelIndentation: null,
    model: null,
    reorderable: null,
    rubberBanding: null,
    rulesHint: null,
    searchColumn: null,
    showExpanders: null,
    tooltipColumn: null,
    ubuntuAlmostFixedHeightMode: null,
    borderWidth: null,
    child: null,
    resizeMode: null
  };

  constructor(props: object = {}) {
    super(new Gtk.TreeView(), props, { isContainer: true });
  }

  appendColumn(column: object): number {
    return this.node.appendColumn(column);
  }

  collapseAll(): null {
    return this.node.collapseAll();
  }

  collapseRow(path: object): boolean {
    return this.node.collapseRow(path);
  }

  columnsAutosize(): null {
    return this.node.columnsAutosize();
  }

  convertBinWindowToTreeCoords(
    bx: number,
    by: number,
    tx: number,
    ty: number
  ): null {
    return this.node.convertBinWindowToTreeCoords(bx, by, tx, ty);
  }

  convertBinWindowToWidgetCoords(
    bx: number,
    by: number,
    wx: number,
    wy: number
  ): null {
    return this.node.convertBinWindowToWidgetCoords(bx, by, wx, wy);
  }

  convertTreeToBinWindowCoords(
    tx: number,
    ty: number,
    bx: number,
    by: number
  ): null {
    return this.node.convertTreeToBinWindowCoords(tx, ty, bx, by);
  }

  convertTreeToWidgetCoords(
    tx: number,
    ty: number,
    wx: number,
    wy: number
  ): null {
    return this.node.convertTreeToWidgetCoords(tx, ty, wx, wy);
  }

  convertWidgetToBinWindowCoords(
    wx: number,
    wy: number,
    bx: number,
    by: number
  ): null {
    return this.node.convertWidgetToBinWindowCoords(wx, wy, bx, by);
  }

  convertWidgetToTreeCoords(
    wx: number,
    wy: number,
    tx: number,
    ty: number
  ): null {
    return this.node.convertWidgetToTreeCoords(wx, wy, tx, ty);
  }

  createRowDragIcon(path: object): object {
    return this.node.createRowDragIcon(path);
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

  expandAll(): null {
    return this.node.expandAll();
  }

  expandRow(path: object, openAll: boolean): boolean {
    return this.node.expandRow(path, openAll);
  }

  expandToPath(path: object): null {
    return this.node.expandToPath(path);
  }

  insertColumn(column: object, position: number): number {
    return this.node.insertColumn(column, position);
  }

  insertColumnWithAttributes(
    position: number,
    title: string,
    cell: object,
    ___: object
  ): number {
    return this.node.insertColumnWithAttributes(position, title, cell, ___);
  }

  insertColumnWithDataFunc(
    position: number,
    title: string,
    cell: object,
    func: object,
    data: object,
    dnotify: object
  ): number {
    return this.node.insertColumnWithDataFunc(
      position,
      title,
      cell,
      func,
      data,
      dnotify
    );
  }

  isBlankAtPos(
    x: number,
    y: number,
    path: object,
    column: object,
    cellX: number,
    cellY: number
  ): boolean {
    return this.node.isBlankAtPos(x, y, path, column, cellX, cellY);
  }

  isRubberBandingActive(): boolean {
    return this.node.isRubberBandingActive();
  }

  mapExpandedRows(func: object, data: object): null {
    return this.node.mapExpandedRows(func, data);
  }

  moveColumnAfter(column: object, baseColumn: object): null {
    return this.node.moveColumnAfter(column, baseColumn);
  }

  removeColumn(column: object): number {
    return this.node.removeColumn(column);
  }

  rowActivated(path: object, column: object): null {
    return this.node.rowActivated(path, column);
  }

  rowExpanded(path: object): boolean {
    return this.node.rowExpanded(path);
  }

  scrollToCell(
    path: object,
    column: object,
    useAlign: boolean,
    rowAlign: number,
    colAlign: number
  ): null {
    return this.node.scrollToCell(path, column, useAlign, rowAlign, colAlign);
  }

  scrollToPoint(treeX: number, treeY: number): null {
    return this.node.scrollToPoint(treeX, treeY);
  }

  unsetRowsDragDest(): null {
    return this.node.unsetRowsDragDest();
  }

  unsetRowsDragSource(): null {
    return this.node.unsetRowsDragSource();
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
