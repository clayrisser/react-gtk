import GtkGir, { Element } from '../gtkGir';
import generateElement from './generate/element';

export default async function generate() {
  const gtkGir = new GtkGir();
  await Promise.all(
    gtkGir.elements.map(async (element: Element) => {
      await generateElement(element.klass.name);
    })
  );
}

generate();
