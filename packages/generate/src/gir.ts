import fs from 'fs-extra';
import path from 'path';
import { DOMParser } from 'xmldom';

export default class Gir {
  girPath: string;

  dom: HTMLElement;

  constructor(girPath: string) {
    this.girPath = path.resolve(__dirname, girPath);
    this.dom = this.createDom();
  }

  get namespaces() {
    return this.getNamespaces();
  }

  get classes() {
    return this.getClasses();
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

  getNamespaces() {
    return this.getNodes('namespace').map((node: Node) => {
      const ns: Namespace = {
        classes: this.getClasses(node)
      };
      return ns;
    });
  }

  getClasses(nsNode?: Node): Class[] {
    return this.getNodes('class', nsNode).map((node: Node) => {
      const self = this;
      const klass: Class = {
        ...node,
        methods: this.getMethods(node),
        properties: this.getProperties(node),
        ...createClassNodeMethods(nsNode!, node, self)
      };
      return klass;
    });
  }

  getClass(nsNode?: Node, where: Where = {}): Class | null {
    const node = this.getNode('class', nsNode, where);
    const self = this;
    if (node) {
      const klass: Class = {
        ...node,
        methods: this.getMethods(node),
        properties: this.getProperties(node),
        ...createClassNodeMethods(nsNode!, node, self)
      };
      return klass;
    }
    return null;
  }

  getMethods(klass?: Node): Method[] {
    return this.getNodes('method', klass).map((node: Node) => {
      const method: Method = {
        ...node,
        parameters: this.getParameters(node),
        returnValue: this.getReturnValues(node)?.[0]
      };
      return method;
    });
  }

  getParameters(method?: Node): TypedNode[] {
    return this.getNodes('parameter', method).map((node: Node) => {
      const parameters: TypedNode = {
        ...node,
        type: this.getTypes(node)?.[0]
      };
      return parameters;
    });
  }

  getTypes(node?: Node): Type[] {
    return this.getNodes('type', node).map((node: Node) => {
      const parentNodeAny: any = node.element.parentNode;
      const typeNode: Type = {
        ...node,
        isArray: parentNodeAny?.tagName === 'array'
      };
      return typeNode;
    });
  }

  getProperties(klass?: Node): TypedNode[] {
    return this.getNodes('property', klass).map((node: Node) => {
      const property: TypedNode = {
        ...node,
        type: this.getTypes(node)?.[0]
      };
      return property;
    });
  }

  getReturnValues(method?: Node): TypedNode[] {
    return this.getNodes('return-value', method).map((node: Node) => {
      const returnValue: TypedNode = {
        ...node,
        type: this.getTypes(node)?.[0]
      };
      return returnValue;
    });
  }

  getNodes(nodeType: string, node?: Node): Node[] {
    const element = node ? node.element : this.dom;
    return Object.entries(element.getElementsByTagName(nodeType)).reduce(
      (nodes: Node[], [key, element]: [string, Element]) => {
        if (isNaN(Number(key))) return nodes;
        const node: Node = {
          attrs: this.getAttrs(element),
          element,
          nodeType
        };
        nodes.push(node);
        return nodes;
      },
      []
    );
  }

  getNode(nodeType: string, node?: Node, where: Where = {}): Node | null {
    return (
      this.getNodes(nodeType, node).find((node: Node) => {
        return !!Object.entries(where).find(([key, value]: [string, any]) => {
          return node.attrs[key] === value;
        });
      }) || null
    );
  }

  getAttrs(element: Element): Attrs {
    return Object.values(element.attributes).reduce(
      (attrs: Attrs, attribute: Attr) => {
        if (attribute.name) {
          attrs[attribute.name] = element.getAttribute(attribute.name);
        }
        return attrs;
      },
      {}
    );
  }

  createDom() {
    const xml = fs.readFileSync(this.girPath).toString();
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, 'text/xml');
    return doc.documentElement;
  }
}

export interface Where {
  [key: string]: any;
}

export interface Namespace {
  classes: Class[];
}

export interface Class extends Node {
  getParent(): Class | null;
  hasParent(where?: Where): boolean;
  methods: Method[];
  properties: TypedNode[];
}

export interface Method extends Node {
  parameters: TypedNode[];
  returnValue: TypedNode;
}

export interface Node {
  attrs: Attrs;
  element: Element;
  nodeType: string;
}

export interface TypedNode extends Node {
  type: Type;
}

export interface Type extends Node {
  isArray: boolean;
}

export interface Attrs {
  [key: string]: any;
}

function createClassNodeMethods(nsNode: Node, node: Node, self: Gir) {
  return {
    getParent(): Class | null {
      return self.getClass(nsNode, { name: node.attrs.parent });
    },
    hasParent(where: Where = {}) {
      const parent = this.getParent();
      if (!parent) return false;
      const foundParent = !!Object.entries(where).find(
        ([key, value]: [string, any]) => {
          return parent.attrs[key] === value;
        }
      );
      if (foundParent) return true;
      return parent.hasParent(where);
    }
  };
}
