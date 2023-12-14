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
import { Stage } from './types';
import { Text } from './elements/Text';
import { logger } from './util';
import type {
  ChildSet,
  Container,
  GtkNode,
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

// Container: the root node of the tree
// Instance: a virtual dom instance
// Node: a real dom (gtk widget) node

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
    const elementProps = { ...props };
    delete elementProps.children;
    const element = createElement(type, elementProps);
    // TODO: double check type is Text
    if (type !== 'Text' && typeof props.children === 'string') {
      const textNode = new Text({ text: props.children });
      element.appendChild(textNode, { stage: Stage.Mount });
    }
    return element;
  },

  appendInitialChild(parentInstance: Instance, child: Instance | TextInstance): void {
    logger.debug('appendInitialChild');
    parentInstance.appendChild(child, { stage: Stage.Mount });
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
    return new Text({ text });
  },

  getPublicInstance(instance: Instance | TextInstance): PublicInstance {
    logger.debug('getPublicInstance');
    return instance.node;
  },

  prepareForCommit(_rootContainerInstance: Container): Record<string, any> | null {
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

  resetAfterCommit(_rootContainerInstance: Container): void {
    logger.debug('resetAfterCommit');
  },

  resetTextContent(textInstance: TextInstance): void {
    logger.debug('resetTextContent');
    textInstance.resetText({ stage: Stage.Update });
  },

  commitTextUpdate(textInstance: TextInstance, oldText: string, newText: string): void {
    logger.debug('commitTextUpdate');
    textInstance.updateText(oldText, newText, { stage: Stage.Update });
  },

  removeChild(parentInstance: Instance, child: Instance | TextInstance): void {
    logger.debug('removeChild');
    parentInstance.removeChild(child, { stage: Stage.Update });
  },

  removeChildFromContainer(rootContainerInstance: Container, child: Instance | TextInstance): void {
    logger.debug('removeChildFromContainer');
    rootContainerInstance.removeChild(child, { stage: Stage.Update });
  },

  // TODO
  insertBefore(
    _parentInstance: Instance,
    _child: Instance | TextInstance,
    _beforeChild: Instance | TextInstance,
  ): void {
    logger.debug('insertBefore');
    if (dev) logger.warn("'insertBefore' not supported");
  },

  appendChildToContainer(rootContainerInstance: Container, child: Instance | TextInstance): void {
    logger.debug('appendChildToContainer');
    rootContainerInstance.appendChild(child, { parentIsContainer: true, stage: Stage.Mount });
  },

  appendChild(parentInstance: Instance, child: Instance | TextInstance): void {
    logger.debug('appendChild');
    return parentInstance.appendChild(child, { stage: Stage.Update });
  },

  shouldSetTextContent(_type: Type, props: Props): boolean {
    logger.debug('shouldSetTextContent');
    if (typeof props.children === 'string') return true;
    return false;
  },

  getRootHostContext(_rootContainerInstance: Container): HostContext {
    logger.debug('getRootHostContext');
    return {};
  },

  getChildHostContext(_parentHostContext: HostContext, _type: Type, _rootContainerInstance: Container): HostContext {
    logger.debug('getChildHostContext');
    return {};
  },

  commitUpdate(instance: Instance, _updatePayload: any, _type: string, _oldProps: Props, newProps: Props): void {
    logger.debug('commitUpdate');
    instance.commitUpdate(newProps);
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
    clearTimeout(handle);
  },

  preparePortalMount(rootContainerInstance: Container) {
    logger.debug('preparePortalMount');
    rootContainerInstance.preparePortalMount({ stage: Stage.Mount });
  },

  scheduleMicrotask(callback: () => unknown) {
    logger.debug('scheduleMicrotask');
    queueMicrotask(callback);
  },

  clearContainer(rootContainerInstance: Container) {
    logger.debug('clearContainer');
    rootContainerInstance.removeAllChildren({ stage: Stage.Update });
  },

  getCurrentEventPriority(): Lane {
    logger.debug('getCurrentEventPriority');
    return DefaultEventPriority;
  },

  getInstanceFromNode(node: GtkNode) {
    logger.debug('getInstanceFromNode');
    // TODO: make sure this doesn't create problems
    return (node?._element as any) || null;
  },

  getInstanceFromScope(scopeInstance: any): null | Instance {
    logger.debug('getInstanceFromScope');
    if (scopeInstance.node) return scopeInstance as Instance;
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
