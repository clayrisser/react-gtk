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
import type { Lane } from 'react-reconciler';
import { DefaultEventPriority } from 'react-reconciler/constants';
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
  Record<string, any>,
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

  createInstance(
    type: Type,
    props: Record<string, any>,
    _rootContainerInstance: Container,
    _hostContext: HostContext,
  ): Instance {
    logger.trace('createInstance');
    const elementProps = { ...props };
    delete elementProps.children;
    const element = createElement(type, elementProps);
    // TODO: double check type is Text
    if (type !== 'Text' && typeof props.children === 'string') {
      const textNode = new Text({ text: props.children });
      element.appendChild(textNode);
    }
    return element;
  },

  appendInitialChild(parentInstance: Instance, child: Instance | TextInstance): void {
    logger.trace('appendInitialChild');
    parentInstance.appendChild(child);
  },

  finalizeInitialChildren(
    _parentInstance: Instance,
    _type: Type,
    _props: Record<string, any>,
    _rootContainerInstance: Container,
    _hostContext: HostContext,
  ): boolean {
    logger.trace('finalizeInitialChildren');
    return true;
  },

  createTextInstance(text: string, _rootContainerInstance: Container, _hostContext: HostContext): TextInstance {
    logger.trace('createTextInstance');
    return new Text({ text });
  },

  getPublicInstance(instance: Instance | TextInstance): PublicInstance {
    logger.trace('getPublicInstance');
    return {
      css: instance.css,
      id: instance.id,
      node: instance.node,
    };
  },

  prepareForCommit(_rootContainerInstance: Container): Record<string, any> | null {
    logger.trace('prepareForCommit');
    return null;
  },

  prepareUpdate(
    instance: Instance,
    _type: Type,
    oldProps: Record<string, any>,
    newProps: Record<string, any>,
    _rootContainerInstance: Container,
    _hostContext: HostContext,
  ): UpdatePayload | null {
    logger.trace('prepareUpdate');
    const changes: { props: string[]; style: string[] } = {
      props: [],
      style: [],
    };
    for (let key in { ...oldProps, ...newProps }) {
      if (oldProps[key] !== newProps[key]) {
        changes.props.push(key);
      }
    }
    for (let key in { ...oldProps.style, ...newProps.style }) {
      if (oldProps.style[key] !== newProps.style[key]) {
        changes.style.push(key);
      }
    }
    const updatePayload = changes.props.length || changes.style.length ? { changes } : null;
    if (updatePayload) instance.prepareUpdate(updatePayload.changes, newProps, oldProps);
    return updatePayload;
  },

  resetAfterCommit(_rootContainerInstance: Container): void {
    logger.trace('resetAfterCommit');
  },

  // TODO: implement
  resetTextContent(_textInstance: TextInstance): void {
    logger.trace('resetTextContent');
    return;
  },

  commitTextUpdate(_textInstance: TextInstance, _oldText: string, _newText: string): void {
    logger.trace('commitTextUpdate');
  },

  removeChild(parentInstance: Instance, child: Instance | TextInstance): void {
    logger.trace('removeChild');
    parentInstance.removeChild(child);
  },

  removeChildFromContainer(rootContainerInstance: Container, child: Instance | TextInstance): void {
    logger.trace('removeChildFromContainer');
    rootContainerInstance.removeChild(child);
  },

  insertBefore(parentInstance: Instance, child: Instance | TextInstance, beforeChild: Instance | TextInstance): void {
    logger.trace('insertBefore');
    parentInstance.insertBefore(child, beforeChild);
  },

  appendChildToContainer(rootContainerInstance: Container, child: Instance | TextInstance): void {
    logger.trace('appendChildToContainer');
    rootContainerInstance.appendChild(child);
  },

  appendChild(parentInstance: Instance, child: Instance | TextInstance): void {
    logger.trace('appendChild');
    return parentInstance.appendChild(child);
  },

  // TODO: make this work
  shouldSetTextContent(_type: Type, props: Record<string, any>): boolean {
    logger.trace('shouldSetTextContent');
    if (typeof props.children === 'string') return true;
    return false;
  },

  getRootHostContext(_rootContainerInstance: Container): HostContext {
    logger.trace('getRootHostContext');
    return {};
  },

  getChildHostContext(_parentHostContext: HostContext, _type: Type, _rootContainerInstance: Container): HostContext {
    logger.trace('getChildHostContext');
    return {};
  },

  commitUpdate(
    instance: Instance,
    updatePayload: UpdatePayload,
    _type: string,
    oldProps: Record<string, any>,
    newProps: Record<string, any>,
  ): void {
    logger.trace('commitUpdate');
    instance.commitUpdate(updatePayload.changes, oldProps, newProps);
  },

  commitMount(instance: Instance, _type: Type, newProps: Record<string, any>): void {
    logger.trace('commitMount');
    instance.commitMount(newProps);
  },

  scheduleTimeout(handler: (...args: any[]) => void, timeout: number): TimeoutHandle | NoTimeout {
    console.log('SET TIMEOUT');
    logger.trace('setTimeout');
    return setTimeout(handler, timeout);
  },

  cancelTimeout(handle: TimeoutHandle | NoTimeout): void {
    logger.trace('clearTimeout');
    clearTimeout(handle);
  },

  preparePortalMount(_rootContainerInstance: Container) {
    logger.trace('preparePortalMount');
    return;
  },

  scheduleMicrotask(callback: () => unknown) {
    logger.trace('scheduleMicrotask');
    queueMicrotask(callback);
  },

  clearContainer(rootContainerInstance: Container) {
    logger.trace('clearContainer');
    rootContainerInstance.removeAllChildren();
  },

  getCurrentEventPriority(): Lane {
    logger.trace('getCurrentEventPriority');
    return DefaultEventPriority;
  },

  getInstanceFromNode(node: GtkNode) {
    logger.trace('getInstanceFromNode');
    // TODO: make sure this doesn't create problems
    return (node?._element as any) || null;
  },

  getInstanceFromScope(scopeInstance: any): null | Instance {
    logger.trace('getInstanceFromScope');
    if (scopeInstance.node) return scopeInstance as Instance;
    return null;
  },

  beforeActiveInstanceBlur() {
    logger.trace('beforeActiveInstanceBlur');
  },

  afterActiveInstanceBlur() {
    logger.trace('afterActiveInstanceBlur');
  },

  prepareScopeUpdate(_scopeInstance: any, _instance: any) {
    logger.trace('prepareScopeUpdate');
  },

  detachDeletedInstance(_node: Instance) {
    logger.trace('detachDeletedInstance');
  },
});
