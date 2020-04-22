import _ from 'lodash';
import Gir, { Class, Method, TypedNode, Type } from './gir';

export interface Options {
  getSet: boolean;
  girPath: string;
}

export interface ElementClass {
  name: string;
}

export interface ElementPropType {
  name: string;
  type: string;
  [key: string]: any;
}

export interface Element {
  klass: ElementClass;
  propTypes: any;
  methods: ElementMethod[];
}

export interface Parameter {
  name: string;
  type: string;
  [key: string]: any;
}

export interface ElementMethod {
  name: string;
  parameters: Parameter[];
  returnType: string;
  [key: string]: any;
}

export default class GtkGir {
  gir: Gir;

  options: Options;

  constructor(options?: Options) {
    this.options = {
      girPath: '/usr/share/gir-1.0/Gtk-3.0.gir',
      getSet: false,
      ...(options || {})
    };
    this.gir = new Gir(this.options.girPath);
  }

  getPropType(typeNode: Type) {
    const typeName = this.getType(typeNode);
    if (typeName.substr(typeName.length - 2, typeName.length - 1) === '[]') {
      return 'array';
    }
    return (
      ((typeName: string) =>
        (({
          function: 'func',
          boolean: 'bool'
        } as { [key: string]: string })[typeName]))(typeName) || typeName
    );
  }

  getElementPropTypes(
    klass: Class,
    previousElementPropTypes: ElementPropType[] = []
  ): ElementPropType[] {
    const elementPropTypes = _.uniqBy(
      [
        ...previousElementPropTypes,
        ...this.gir.getProperties(klass).map((propertyNode: TypedNode) => {
          const elementPropType: ElementPropType = {
            ...propertyNode.attrs,
            name: camelCase(propertyNode.attrs.name),
            type: this.getPropType(propertyNode.type)
          };
          return elementPropType;
        })
      ],
      propType => propType.name
    );
    const klassParent = klass.getParent();
    if (klassParent && klassParent.hasParent({ name: 'Widget' })) {
      return this.getElementPropTypes(klassParent, elementPropTypes);
    }
    return elementPropTypes;
  }

  get elements(): Element[] {
    return this.gir.classes.reduce((elements: Element[], klass: Class) => {
      if (
        klass.hasParent({ name: 'Widget' }) &&
        klass.attrs?.abstract !== '1'
      ) {
        elements.push({
          klass: {
            name: klass.attrs.name
          },
          propTypes: this.getElementPropTypes(klass),
          methods: this.getElementMethods(klass)
        });
      }
      return elements;
    }, []);
  }

  getElementMethods(klass: Class): ElementMethod[] {
    return this.gir
      .getMethods(klass)
      .reduce((elementMethods: ElementMethod[], method: Method) => {
        const parameters: Parameter[] = method.parameters.map(
          (parameterNode: TypedNode) => {
            const parameter: Parameter = {
              ...parameterNode.attrs,
              name: camelCase(parameterNode.attrs.name),
              type: this.getType(parameterNode.type)
            };
            return parameter;
          }
        );
        if (
          !this.options.getSet &&
          (method.attrs.name.substr(0, 3) === 'get' ||
            method.attrs.name.substr(0, 3) === 'set')
        ) {
          return elementMethods;
        }
        const elementMethod: ElementMethod = {
          ...method.attrs,
          name: camelCase(method.attrs.name),
          parameters,
          returnType: this.getType(method.returnValue.type)
        };
        elementMethods.push(elementMethod);
        return elementMethods;
      }, []);
  }

  getType(typeNode: Type) {
    const tsType =
      ((typeName: string) =>
        (({
          'GLib.List': 'object[]',
          'GLib.SList': 'string[]',
          gboolean: 'boolean',
          gdouble: 'number',
          gfloat: 'number',
          gint: 'number',
          glong: 'number',
          gsize: 'number',
          guint16: 'number',
          guint32: 'number',
          guint8: 'number',
          guint: 'number',
          gunichar: 'string',
          none: 'null',
          utf8: 'string'
        } as { [key: string]: string })[typeName]))(typeNode?.attrs?.name) ||
      'object';
    return (
      tsType +
      (tsType !== 'null'
        ? // TODO: improve code
          _.times(Number(typeNode?.isArray), () => '[]').join('')
        : '')
    );
  }
}

function camelCase(str: string): string {
  str = str.replace(/\./g, '_');
  const camelCaseStr = _.camelCase(str);
  return camelCaseStr.length ? camelCaseStr : str;
}
