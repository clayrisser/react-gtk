import elements from './elements';
import { Instance } from './types';

export default function createElement(elementType: string, props: any) {
  const Element: typeof Instance = elements[elementType];
  if (!Element) throw new Error(`unknown element of type '${elementType}'`);
  return new Element(props);
}
