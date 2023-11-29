/*
 *  File: /src/reconciler.ts
 *  Project: @react-gtk/core
 *  File Created: 28-11-2023 22:32:06
 *  Author: Clay Risser
 *  -----
 *  BitSpur (c) Copyright 2017 - 2023
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import ReactReconciler from 'react-reconciler';
import createElement from './createElement';
import dev from './dev';
import type { Lane } from 'react-reconciler';
import { DefaultEventPriority } from 'react-reconciler/constants';
import { Label } from './elements';
import { logger } from './util';
import type {
  ChildSet,
  Container,
  HostContext,
  HydratableInstance,
  Instance,
  NoTimeout,
  Props,
  PublicInstance,
  SuspenseInstance,
  TextInstance,
  TimeoutHandle,
  Type,
  UpdatePayload,
} from './types';

// https://blog.atulr.com/react-custom-renderer-3
// https://github.com/nitin42/Making-a-custom-React-renderer/blob/master/part-one.md
// https://www.youtube.com/watch?v=SXx-CymMjDM

export default ReactReconciler<
  Type,
  Props,
  Container,
  Instance,
  TextInstance,
  SuspenseInstance,
  HydratableInstance,
  PublicInstance,
  HostContext,
  UpdatePayload,
  ChildSet,
  TimeoutHandle,
  NoTimeout
>({
  noTimeout: -1 as NoTimeout,

  isPrimaryRenderer: true,

  supportsMutation: true,

  supportsPersistence: false,

  supportsHydration: false,

  createInstance(type: Type, props: Props, _rootContainerInstance: Container, _hostContext: HostContext): Instance {
    logger.debug('createInstance');
    return createElement(type, props);
  },

  appendInitialChild(parentInstance: Instance, child: Instance | TextInstance): void {
    logger.debug('appendInitialChild');
    parentInstance.appendChild(child);
  },

  finalizeInitialChildren(
    _parentInstance: Instance,
    _type: Type,
    _props: Props,
    _rootContainerInstance: Container,
    _hostContext: HostContext,
  ): boolean {
    logger.debug('finalizeInitialChildren');
    return true;
  },

  createTextInstance(text: string, _rootContainerInstance: Container, _hostContext: HostContext): TextInstance {
    logger.debug('createTextInstance');
    const label = new Label({ label: text });
    label.commitMount(); // prob should run at a later point
    return label;
  },

  getPublicInstance(instance: Instance | TextInstance): PublicInstance {
    logger.debug('getPublicInstance');
    return instance;
  },

  prepareForCommit(_containerInfo: Container): Record<string, any> | null {
    logger.debug('prepareForCommit');
    return null;
  },

  prepareUpdate(
    _instance: Instance,
    _type: Type,
    _oldProps: Props,
    _newProps: Props,
    _rootContainerInstance: Container,
    _hostContext: HostContext,
  ): null | UpdatePayload {
    logger.debug('prepareUpdate');
    return true;
  },

  resetAfterCommit(_containerInfo: Container): void {
    logger.debug('resetAfterCommit');
  },

  resetTextContent(_instance: Instance): void {
    logger.debug('resetTextContent');
  },

  commitTextUpdate(_textInstance: TextInstance, _oldText: string, _newText: string): void {
    logger.debug('commitTextUpdate');
    throw new Error('commitTextUpdate should not be called');
  },

  removeChild(parentInstance: Instance, child: Instance | TextInstance): void {
    logger.debug('removeChild');
    parentInstance.removeChild(child);
  },

  removeChildFromContainer(_container: Container, _child: Instance | TextInstance): void {
    logger.debug('removeChildFromContainer');
    if (dev) logger.warn("'removeChildFromContainer' not supported");
  },

  insertBefore(
    _parentInstance: Instance,
    _child: Instance | TextInstance,
    _beforeChild: Instance | TextInstance,
  ): void {
    logger.debug('insertBefore');
    if (dev) logger.warn("'insertBefore' not supported");
  },

  appendChildToContainer(container: Container, child: Instance | TextInstance): void {
    logger.debug('appendChildToContainer');
    return container.appendChild(child);
  },

  appendChild(parentInstance: Instance, child: Instance | TextInstance): void {
    logger.debug('appendChild');
    return parentInstance.appendChild(child);
  },

  shouldSetTextContent(_type: Type, props: Props): boolean {
    logger.debug('shouldSetTextContent');
    if (typeof props.children === 'string') return true;
    return false;
  },

  getRootHostContext(_rootContainerInstance: Container): HostContext {
    logger.debug('getRootHostContext');
    if (dev) logger.warn("'getRootHostContext' not supported");
    return {};
  },

  getChildHostContext(_parentHostContext: HostContext, _type: Type, _rootContainerInstance: Container): HostContext {
    logger.debug('getChildHostContext');
    if (dev) logger.warn("'getChildHostContext' not supported");
    return {};
  },

  commitUpdate(instance: Instance, _updatePayload: any, _type: string, _oldProps: Props, newProps: Props): void {
    return instance.commitUpdate(newProps);
  },

  commitMount(instance: Instance, _type: Type, _newProps: Props): void {
    logger.debug('commitMount');
    instance.commitMount();
  },

  scheduleTimeout(handler: (...args: any[]) => void, timeout: number): TimeoutHandle | NoTimeout {
    logger.debug('setTimeout');
    return setTimeout(handler, timeout);
  },

  cancelTimeout(handle: TimeoutHandle | NoTimeout): void {
    logger.debug('clearTimeout');
    return clearTimeout(handle);
  },

  preparePortalMount() {
    logger.debug('preparePortalMount');
  },

  scheduleMicrotask(callback: () => unknown) {
    queueMicrotask(callback);
  },

  clearContainer(_container: Container) {
    logger.debug('clearContainer');
  },

  getCurrentEventPriority(): Lane {
    return DefaultEventPriority;
  },

  getInstanceFromNode(_node: any) {
    logger.debug('getInstanceFromNode');
    return null;
  },

  getInstanceFromScope(scopeInstance: any): null | Instance {
    logger.debug('getInstanceFromScope');
    if (scopeInstance.node) {
      return scopeInstance as Instance;
    }
    return null;
  },

  beforeActiveInstanceBlur() {
    logger.debug('beforeActiveInstanceBlur');
  },

  afterActiveInstanceBlur() {
    logger.debug('afterActiveInstanceBlur');
  },

  prepareScopeUpdate(_scopeInstance: any, _instance: any) {
    logger.debug('prepareScopeUpdate');
  },

  detachDeletedInstance(_node: Instance) {
    logger.debug('detachDeletedInstance');
  },
});
