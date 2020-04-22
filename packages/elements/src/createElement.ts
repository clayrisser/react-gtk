import { Instance } from '@react-gtk/core';
import elements from '.';

export default function createElement(elementType: string, props: any) {
  const Element: typeof Instance = elements[elementType];
  if (!Element) throw new Error(`unknown element of type '${elementType}'`);
  return new Element(props);
}
