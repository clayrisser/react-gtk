import ReactReconciler from 'react-reconciler';
import createElement from './createElement';
import { Label } from './elements';
import {
  ChildSet,
  Container,
  HostContext,
  HydratableInstance,
  Instance,
  NoTimeout,
  Props,
  PublicInstance,
  TextInstance,
  TimeoutHandle,
  Type,
  UpdatePayload,
} from './types';

// eslint-disable-next-line no-console
const log = console;

// bindings to the react reconciliation lifecycle methods
export default ReactReconciler<
  Type,
  Props,
  Container,
  Instance,
  TextInstance,
  HydratableInstance,
  PublicInstance,
  HostContext,
  UpdatePayload,
  ChildSet,
  TimeoutHandle,
  NoTimeout
>({
  createInstance(
    type: Type,
    props: Props,
    _rootContainerInstance: Container,
    _hostContext: HostContext
  ): Instance {
    log.debug('createInstance');
    return createElement(type, props);
  },

  appendInitialChild(
    parentInstance: Instance,
    child: Instance | TextInstance
  ): void {
    log.debug('appendInitialChild');
    parentInstance.appendChild(child);
  },

  finalizeInitialChildren(
    _parentInstance: Instance,
    _type: Type,
    _props: Props,
    _rootContainerInstance: Container,
    _hostContext: HostContext
  ): boolean {
    log.debug('finalizeInitialChildren');
    return true;
  },

  createTextInstance(
    text: string,
    _rootContainerInstance: Container,
    _hostContext: HostContext
    // @ts-ignore
  ): TextInstance {
    log.debug('createTextInstance');
    const label = new Label({ label: text });
    label.commitMount(); // prob should run at a later point
    return label;
  },

  getPublicInstance(instance: Instance | TextInstance): PublicInstance {
    log.debug('getPublicInstance');
    return instance;
  },

  prepareForCommit(_containerInfo: Container): void {
    log.debug('prepareForCommit');
  },

  prepareUpdate(
    _instance: Instance,
    _type: Type,
    _oldProps: Props,
    _newProps: Props,
    _rootContainerInstance: Container,
    _hostContext: HostContext
  ): null | UpdatePayload {
    log.debug('prepareUpdate');
    return true;
  },

  resetAfterCommit(_containerInfo: Container): void {
    log.debug('resetAfterCommit');
  },

  resetTextContent(_instance: Instance): void {
    log.debug('resetTextContent');
  },

  commitTextUpdate(
    _textInstance: TextInstance,
    _oldText: string,
    _newText: string
  ): void {
    log.debug('commitTextUpdate');
    throw new Error('commitTextUpdate should not be called');
  },

  removeChild(
    _parentInstance: Instance,
    _child: Instance | TextInstance
  ): void {
    log.debug('removeChild');
  },

  removeChildFromContainer(
    _container: Container,
    _child: Instance | TextInstance
  ): void {
    log.debug('removeChildFromContainer');
  },

  insertBefore(
    _parentInstance: Instance,
    _child: Instance | TextInstance,
    _beforeChild: Instance | TextInstance
  ): void {
    log.debug('insertBefore');
  },

  appendChildToContainer(
    container: Container,
    child: Instance | TextInstance
  ): void {
    log.debug('appendChildToContainer');
    container.appendChild(child);
  },

  appendChild(parentInstance: Instance, child: Instance | TextInstance): void {
    log.debug('appendChild');
    parentInstance.appendChild(child);
  },

  shouldSetTextContent(_type: Type, props: Props): boolean {
    log.debug('shouldSetTextContent');
    if (typeof props.children === 'string') return true;
    return false;
  },

  // @ts-ignore
  getRootHostContext(_rootContainerInstance: Container): HostContext {
    log.debug('getRootHostContext');
  },

  getChildHostContext(
    _parentHostContext: HostContext,
    _type: Type,
    _rootContainerInstance: Container
    // @ts-ignore
  ): HostContext {
    log.debug('getChildHostContext');
  },

  now: Date.now,

  commitUpdate(
    instance: Instance,
    _updatePayload: any,
    _type: string,
    _oldProps: Props,
    newProps: Props
  ): void {
    log.debug('commitUpdate');
    return instance.commitUpdate(newProps);
  },

  commitMount(instance: Instance, _type: Type, _newProps: Props): void {
    log.debug('commitMount');
    instance.commitMount();
  },

  shouldDeprioritizeSubtree(): boolean {
    log.debug('shouldDeprioritizeSubtree');
    return true;
  },

  scheduleDeferredCallback(
    callback?: () => any,
    _options?: { timeout: number }
  ): any {
    log.debug('scheduleDeferredCallback');
    if (callback) {
      throw new Error(
        'Scheduling a callback twice is excessive. Instead, keep track of ' +
          'whether the callback has already been scheduled.'
      );
    }
  },

  cancelDeferredCallback(_callbackID: any): void {
    log.debug('cancelDeferredCallback');
  },

  setTimeout(
    handler: (...args: any[]) => void,
    timeout: number
  ): TimeoutHandle | NoTimeout {
    log.debug('setTimeout');
    return setTimeout(handler, timeout);
  },

  clearTimeout(handle: TimeoutHandle | NoTimeout): void {
    log.debug('clearTimeout');
    return clearTimeout(handle);
  },

  noTimeout: -1 as NoTimeout,

  isPrimaryRenderer: true,

  supportsMutation: true,

  supportsPersistence: false,

  supportsHydration: false,
});
