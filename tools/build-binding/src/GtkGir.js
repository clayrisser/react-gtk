import _ from 'lodash';
import fs from 'fs-extra';
import path from 'path';
import { DOMParser } from 'xmldom';

export default class GtkGir {
  constructor() {
    this.girPath = path.resolve(__dirname, '../Gtk-3.0.gir');
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
    return _.map(this.getNodes('namespace'), namespace => {
      return {
        classes: this.getClasses(namespace)
      };
    });
  }

  getClasses(namespace) {
    return _.map(this.getNodes('class', namespace), klass => {
      return {
        ...klass,
        methods: this.getMethods(klass),
        properties: this.getProperties(klass)
      };
    });
  }

  getMethods(klass) {
    return _.map(this.getNodes('method', klass), method => {
      return {
        ...method,
        parameters: this.getParameters(method),
        returnValue: this.getReturnValues(method)?.[0]
      };
    });
  }

  getParameters(method) {
    return _.map(this.getNodes('parameter', method), parameter => {
      return {
        ...parameter,
        type: this.getTypes(parameter)?.[0]
      };
    });
  }

  getTypes(node) {
    return this.getNodes('type', node);
  }

  getProperties(klass) {
    return _.map(this.getNodes('property', klass), property => {
      return {
        ...property,
        type: this.getTypes(property)?.[0]
      };
    });
  }

  getReturnValues(method) {
    return _.map(this.getNodes('return-value', method), returnValue => {
      return {
        ...returnValue,
        type: this.getTypes(returnValue)?.[0]
      };
    });
  }

  getNodes(nodeType, node) {
    const element = node ? node.element : this.dom;
    return _.map(element.getElementsByTagName(nodeType), element => {
      return {
        attrs: this.getAttrs(element),
        element,
        nodeType
      };
    });
  }

  getAttrs(element) {
    return _.reduce(
      element.attributes,
      (namespace, attribute) => {
        if (attribute.name) {
          namespace[attribute.name] = element.getAttribute(attribute.name);
        }
        return namespace;
      },
      {}
    );
  }

  async init() {
    this.dom = await this.createDom();
  }

  async createDom() {
    const xml = (await fs.readFile(this.girPath)).toString();
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, 'text/xml');
    return doc.documentElement;
  }
}
