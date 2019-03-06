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
    return (
      (type =>
        ({
          function: 'func',
          boolean: 'bool'
        }[type]))(type) || type
    );
  }

  getType(type) {
    type = type?.attrs?.name;
    return (
      (type =>
        ({
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
        }[type]))(type) || 'object'
    );
  }

  async getElementsData(options = {}) {
    const { getSet = false } = options;
    const elementsData = [];
    await mapSeries(this.gtkGir.classes, async klass => {
      if (klass.hasParent({ name: 'Widget' })) {
        elementsData.push({
          klass: {
            name: klass.attrs.name
          },
          propTypes: _.map(this.gtkGir.getProperties(klass), property => ({
            ...property.attrs,
            name: _.camelCase(property.attrs.name),
            type: this.getPropType(property.type)
          })),
          methods: _.filter(
            _.map(this.gtkGir.getMethods(klass), method => {
              const parameters = _.map(method.parameters, parameter => ({
                ...parameter.attrs,
                name: _.camelCase(parameter.attrs.name),
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
                name: _.camelCase(method.attrs.name),
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
        });
      }
    });
    return elementsData;
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
