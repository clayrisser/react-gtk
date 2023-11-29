import Renderer from './Renderer';

async function main() {
  const renderer = new Renderer();
  await renderer.init();
  await renderer.renderElements();
  await renderer.renderIndex();
}

main();
