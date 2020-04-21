import elements from './elements';
import { IElement } from './elements/BaseElement';

export default function createElement(elementType: string, props: any) {
  const Element: IElement = elements[elementType];
  if (!Element) throw new Error(`unknown element of type '${elementType}'`);
  return new Element(props);
}
