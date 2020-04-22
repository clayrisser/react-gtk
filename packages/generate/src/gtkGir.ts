import _ from 'lodash';
import Gir, { Class, Method, TypedNode, Type } from './gir';

export interface Options {
  getSet?: boolean;
}

export interface ElementOptions {
  [key: string]: any;
}

export interface ElementClass {
  name: string;
}

export interface Element {
  klass: ElementClass;
  options: ElementOptions[];
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
  typedParameterString: string;
  parameterString: string;
  returnType: string;
  [key: string]: any;
}

export default class GtkGir {
  gir: Gir;

  constructor(girPath = '/usr/share/gir-1.0/Gtk-3.0.gir') {
    this.gir = new Gir(girPath);
  }

  getElementPropTypes(klass: Class, options: Options) {
    return { klass, options };
  }

  getElements(options: Options = {}): Element[] {
    return this.gir.classes.reduce((elements: Element[], klass: Class) => {
      if (
        klass.hasParent({ name: 'Widget' }) &&
        klass.attrs?.abstract !== '1'
      ) {
        elements.push({
          klass: {
            name: klass.attrs.name
          },
          options: [
            ...(klass.attrs.name === 'Container' ||
            klass.hasParent({ name: 'Container' })
              ? [{ name: 'isContainer', value: 'true' }]
              : [])
          ],
          propTypes: this.getElementPropTypes(klass, options),
          methods: this.getElementMethods(klass, options)
        });
      }
      return elements;
    }, []);
  }

  getElementMethods(klass: Class, options: Options): ElementMethod[] {
    options = {
      getSet: false,
      ...options
    };
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
          !options.getSet &&
          (method.attrs.name.substr(0, 3) === 'get' ||
            method.attrs.name.substr(0, 3) === 'set')
        ) {
          return elementMethods;
        }
        const elementMethod: ElementMethod = {
          ...method.attrs,
          name: camelCase(method.attrs.name),
          parameters,
          typedParameterString: _.map(
            parameters,
            (parameter, i) =>
              `${parameter.name}: ${parameter.type}${
                i < parameters.length - 1 ? ', ' : ''
              }`
          ).join(''),
          parameterString: _.map(
            parameters,
            (parameter, i) =>
              parameter.name + (i < parameters.length - 1 ? ', ' : '')
          ).join(''),
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
