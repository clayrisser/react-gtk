/*
 *  File: /src/elements/Element.ts
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

import PropTypes from 'prop-types';
import { Instance, GtkNode, Props, ElementMeta, AddNode, RemoveNode } from '../types';

export class Element implements Instance {
  static defaultProps: Props = {};

  static propTypes: object = {};

  props: Props;

  addNode?: AddNode;

  removeNode?: RemoveNode;

  mapChildren?: string;

  children: Instance[] = [];

  constructor(
    public node: GtkNode,
    props: Props = {},
    meta: ElementMeta = {},
  ) {
    const { addNode, removeNode, mapChildren }: ElementMeta = meta;
    if (addNode) this.addNode = addNode;
    if (removeNode) this.removeNode = removeNode;
    this.mapChildren = mapChildren;
    this.props = this.getProps(props);
  }

  appendChild(child: Instance) {
    // this.update();
    this.children.push(child);
    if (this.addNode) this.addNode(child.node);
  }

  removeChild(child: Instance) {
    this.children.splice(this.children.indexOf(child), 1);
    if (this.removeNode) this.removeNode(child.node);
  }

  commitMount() {
    this.update();
  }

  commitUpdate(newProps: Props) {
    this.props = {
      ...this.props,
      ...newProps,
    };
    this.update();
  }

  update() {
    this.updateNode();
    // this.node.showAll();
  }

  updateNode() {
    // if (this.mapChildren && typeof this.props.children !== 'undefined' && this.props.children !== null) {
    //   this.node[this.mapChildren] = this.props.children;
    // }
    // Object.keys(this.props).forEach((key: string) => {
    //   const prop: Prop = this.props[key];
    //   if (typeof prop !== 'undefined' && prop !== null) {
    //     this.node[key] = prop;
    //   }
    // });
  }

  getProps(props: Props): Props {
    props = { ...props };
    const { defaultProps, propTypes } = this.constructor as typeof Element;
    Object.keys(defaultProps).forEach((key) => {
      const defaultProp = defaultProps[key];
      if (typeof props[key] === 'undefined' || props[key] === null) {
        props[key] = defaultProp;
      }
    });
    PropTypes.checkPropTypes(propTypes, props, 'prop', this.constructor.name);
    return props;
  }
}
