/**
 * File: /src/generate/gir/gir.ts
 * Project: react-gtk
 * File Created: 10-07-2021 20:50:56
 * Author: Clay Risser <email@clayrisser.com>
 * -----
 * Last Modified: 10-07-2021 22:32:19
 * Modified By: Clay Risser <email@clayrisser.com>
 * -----
 * Silicon Hills LLC (c) Copyright 2021
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import fs from 'fs-extra';
import { DOMParser } from 'xmldom';
import {
  Attrs,
  Klass,
  Method,
  Namespace,
  Node,
  NodeType,
  Parameter,
  Property,
  ReturnValue,
  Type,
  Where
} from '~/generate/types';

export default class Gir {
  constructor(public dom: Element) {}

  static async create(girPath: string) {
    return new Gir(await Gir.loadGir(girPath));
  }

  protected static async loadGir(girPath: string): Promise<Element> {
    const xml = (await fs.readFile(girPath)).toString();
    const parser = new DOMParser();
    return parser.parseFromString(xml, 'text/xml').documentElement;
  }

  getParameters(methodNode?: Node): Parameter[] {
    return this.getNodes(NodeType.Parameter, methodNode).map((node: Node) => ({
      ...node,
      type: this.getTypes(node)?.[0]
    }));
  }

  getReturnValues(methodNode?: Node): ReturnValue[] {
    return this.getNodes(NodeType.ReturnValue, methodNode).map(
      (node: Node) => ({
        ...node,
        type: this.getTypes(node)?.[0]
      })
    );
  }

  getMethods(klassNode?: Node): Method[] {
    return this.getNodes(NodeType.Method, klassNode).map((node: Node) => ({
      ...node,
      parameters: this.getParameters(node),
      returnValue: this.getReturnValues(node)?.[0]
    }));
  }

  getAttrs(element: Element): Attrs {
    return Array.from(element.attributes).reduce((attrs: Attrs, attr: Attr) => {
      if (attr.name) attrs[attr.name] = element.getAttribute(attr.name);
      return attrs;
    }, {});
  }

  getNodes(nodeType: NodeType, node?: Node): Node[] {
    const element = node ? node.element : this.dom;
    return Array.from(element.getElementsByTagName(nodeType.toString())).map(
      (element: Element) => ({
        attrs: this.getAttrs(element),
        element,
        nodeType
      })
    );
  }

  getTypes(node?: Node): Type[] {
    return this.getNodes(NodeType.Type, node).map((node: Node) => ({
      ...node,
      // TODO: verify isArray is working
      isArray: node && node.element.parentNode?.nodeName === 'array'
    }));
  }

  getProperties(klassNode?: Node): Property[] {
    return this.getNodes(NodeType.Property, klassNode).map((node: Node) => ({
      ...node,
      type: this.getTypes(node)?.[0]
    }));
  }

  getNamespaces(): Namespace[] {
    return this.getNodes(NodeType.Namespace).map((node: Node) => ({
      ...node,
      klasses: this.getKlasses(node)
    }));
  }

  getKlasses(namespaceNode?: Node): Klass[] {
    return this.getNodes(NodeType.Klass, namespaceNode).map((node: Node) => {
      const self = this;
      return {
        ...node,
        methods: this.getMethods(node),
        properties: this.getProperties(node),
        getParent() {
          return self.getKlass(namespaceNode, { name: node.attrs.parent });
        },
        hasParent(where: Where = {}) {
          const parent = this.getParent();
          if (!parent) return false;
          let foundParent = false;
          Object.entries(where).forEach(([key, value]: [string, any]) => {
            if (parent.attrs[key] === value) {
              foundParent = true;
              return false;
            }
            return true;
          });
          if (foundParent) return true;
          return parent.hasParent(where);
        }
      };
    });
  }

  getNode(nodeType: NodeType, node?: Node, where: Where = {}): Node | void {
    return this.getNodes(nodeType, node).find((node: Node) => {
      let foundNode = false;
      Object.entries(where).forEach(([key, value]: [string, any]) => {
        if (node.attrs[key] === value) {
          foundNode = true;
          return false;
        }
        return true;
      });
      return foundNode;
    });
  }

  getKlass(namespaceNode?: Node, where: Where = {}): Klass | void {
    const node = this.getNode(NodeType.Klass, namespaceNode, where);
    if (!node) return undefined;
    const self = this;
    return {
      ...node,
      methods: this.getMethods(node),
      properties: this.getProperties(node),
      getParent() {
        return self.getKlass(namespaceNode, { name: node.attrs.parent });
      },
      hasParent(where: Where = {}) {
        const parent = this.getParent();
        if (!parent) return false;
        let foundParent = false;
        Object.entries(where).forEach(([key, value]: [string, any]) => {
          if (parent.attrs[key] === value) {
            foundParent = true;
            return false;
          }
          return true;
        });
        if (foundParent) return true;
        return parent.hasParent(where);
      }
    };
  }

  get namespaces() {
    return this.getNamespaces();
  }

  get classes() {
    return this.getKlasses();
  }

  get methods() {
    return this.getMethods();
  }

  get parameters() {
    return this.getParameters();
  }

  get properties() {
    return this.getProperties();
  }

  get types() {
    return this.getTypes();
  }

  get returnValues() {
    return this.getReturnValues();
  }
}
