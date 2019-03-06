import _ from 'lodash';
import { mapSeries } from 'bluebird';
import GtkGir from './GtkGir';
import renderTemplate from './renderTemplate';

export default class Renderer {
  constructor() {
    this.gtkGir = new GtkGir();
  }

  async init() {
    await this.gtkGir.init();
  }

  getPropType(type) {
    type = this.getType(type);
    if (type.substr(type.length - 2, type.length - 1) === '[]') {
      return 'array';
    }
    return (
      (type =>
        ({
          function: 'func',
          boolean: 'bool'
        }[type]))(type) || type
    );
  }

  getType(type) {
    const tsType =
      (type =>
        ({
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
        }[type]))(type?.attrs?.name) || 'object';
    return (
      tsType +
      (tsType !== 'null' ? _.times(type?.isArray, () => '[]').join('') : '')
    );
  }

  async getElementsData(options = {}) {
    const elementsData = [];
    await mapSeries(this.gtkGir.classes, async klass => {
      if (klass.hasParent({ name: 'Widget' })) {
        elementsData.push({
          klass: {
            name: klass.attrs.name
          },
          options: [
            ...(klass.attrs.name === 'Container' ||
            klass.hasParent({ name: 'Container' })
              ? [{ name: 'isContainer', value: 'true' }]
              : [])
          ],
          propTypes: this.getPropTypes(klass, options),
          methods: this.getMethods(klass, options)
        });
      }
    });
    return elementsData;
  }

  getPropTypes(klass, options, propTypes = []) {
    propTypes = _.uniqBy(
      [
        ...propTypes,
        ..._.map(this.gtkGir.getProperties(klass), property => ({
          ...property.attrs,
          name: camelCase(property.attrs.name),
          type: this.getPropType(property.type)
        }))
      ],
      propType => propType.name
    );
    const parent = klass.getParent();
    if (parent && parent.hasParent({ name: 'Widget' })) {
      return this.getPropTypes(parent, options, propTypes);
    }
    return propTypes;
  }

  getMethods(klass, options, methods = []) {
    const { getSet = false } = options;
    methods = _.uniqBy(
      [
        ...methods,
        ..._.filter(
          _.map(this.gtkGir.getMethods(klass), method => {
            const parameters = _.map(method.parameters, parameter => ({
              ...parameter.attrs,
              name: camelCase(parameter.attrs.name),
              type: this.getType(parameter.type)
            }));
            if (
              !getSet &&
              (method.attrs.name.substr(0, 3) === 'get' ||
                method.attrs.name.substr(0, 3) === 'set')
            ) {
              return null;
            }
            return {
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
          }),
          method => !_.isNull(method)
        )
      ],
      method => method.name
    );
    const parent = klass.getParent();
    if (parent && parent.hasParent({ name: 'Widget' })) {
      return this.getMethods(parent, options, methods);
    }
    return methods;
  }

  async renderElements() {
    const elementsData = await this.getElementsData();
    await mapSeries(elementsData, async elementData => {
      await renderTemplate(
        'Element.ts',
        `.elements/${elementData.klass.name}.ts`,
        {
          ...elementData,
          methods: elementData.methods,
          propTypes: elementData.propTypes
        }
      );
    });
  }
}

function camelCase(str) {
  str = str.replace(/\./g, '_');
  const camelCaseStr = _.camelCase(str);
  return camelCaseStr.length ? camelCaseStr : str;
}
