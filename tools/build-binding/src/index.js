import _ from 'lodash';
import GtkGir from './GtkGir';

async function main() {
  const gtkGir = new GtkGir();
  await gtkGir.init();
  console.log(gtkGir.namespaces);
}

main();
