import fs from 'fs-extra';
import path from 'path';
import GtkGir, { Element } from '../gtkGir';
import generateElement from './generate/element';
import { Options } from '../types';

export default async function generate(options: Options) {
  await fs.mkdirs(options.outputPath);
  const gtkGir = new GtkGir();
  await Promise.all(
    gtkGir.elements.map(async (element: Element) => {
      const elementCode = generateElement(element.klass.name);
      await fs.writeFile(
        path.resolve(options.outputPath, `${element.klass.name}.tsx`),
        elementCode
      );
    })
  );
}

generate({ outputPath: path.resolve(process.cwd(), '.tmp') });
