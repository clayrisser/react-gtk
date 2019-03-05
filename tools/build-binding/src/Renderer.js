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

  async getElementsData() {
    const elementsData = [];
    await mapSeries(this.gtkGir.classes, async klass => {
      if (klass.hasParent({ name: 'Widget' })) {
        elementsData.push({
          klass: {
            name: klass.attrs.name
          },
          propTypes: _.map(
            this.gtkGir.getProperties(klass),
            property => property.attrs
          ),
          methods: _.map(this.gtkGir.getMethods(klass), method => {
            return {
              ...method.attrs,
              name: _.camelCase(method.attrs.name),
              parameters: _.map(
                method.parameters,
                parameter => parameter.attrs
              ),
              returnType: method.returnValue.attrs.type
            };
          })
        });
      }
    });
    return JSON.parse(JSON.stringify(elementsData));
  }

  async renderElements() {
    const elementsData = await this.getElementsData();
    await renderTemplate(
      'Element.ts',
      elementsData[0],
      '.elements',
      `${elementsData[0].klass.name}.ts`
    );
  }
}
