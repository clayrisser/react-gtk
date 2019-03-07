import elements from './elements';
import { ElementConstructor } from './elements/Element';

export default function createElement(elementType: string, props: any) {
  const Element: ElementConstructor = elements[elementType];
  if (!Element) {
    throw new Error(`unknown element of type '${elementType}'`);
  }
  return new Element(props);
}
