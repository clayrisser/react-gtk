import GtkGir from '../gtkGir';
import generateElement from './generate/element';

export default async function generate() {
  const gtkGir = new GtkGir();
  await generateElement('Button');
}

generate();
