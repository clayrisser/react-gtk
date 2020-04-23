import fs from 'fs-extra';
import path from 'path';
import GtkGir, { Element } from '../gtkGir';
import generateConstants from './generate/constants';
import generateElement from './generate/element';
import generateIndex from './generate/index';
import { Options } from '../types';

export default async function generate(options: Options) {
  await fs.mkdirs(options.outputPath);
  const gtkGir = new GtkGir();
  await Promise.all([
    await fs.writeFile(
      path.resolve(options.outputPath, 'index.ts'),
      generateIndex(gtkGir.elements)
    ),
    await fs.writeFile(
      path.resolve(options.outputPath, 'constants.ts'),
      generateConstants(gtkGir.elements)
    ),
    ...gtkGir.elements.map(async (element: Element) => {
      const elementCode = generateElement(element);
      await fs.writeFile(
        path.resolve(options.outputPath, `${element.klass.name}.tsx`),
        elementCode
      );
    })
  ]);
}

generate({ outputPath: path.resolve(process.cwd(), '.tmp') });
