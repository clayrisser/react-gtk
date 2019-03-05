import GtkGir from './GtkGir';
import renderTemplate from './renderTemplate';

export default class Renderer {
  constructor() {
    this.gtkGir = new GtkGir();
  }

  async init() {
    await this.gtkGir.init();
  }

  async renderElements() {
    await renderTemplate('Element.ts', {
      klass: {
        name: 'Goober'
      },
      propTypes: [
        {
          name: 'chop',
          type: 'bool'
        },
        {
          name: 'howdy',
          type: 'func'
        }
      ],
      methods: [
        {
          name: 'hello',
          parameters: [
            { name: 'one', type: 'number' },
            { name: 'two', type: 'any' }
          ],
          returnType: 'string'
        }
      ]
    });
  }
}
