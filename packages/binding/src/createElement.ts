type TElement = any;

const elements: { [key: string]: TElement[] } = {};

export default function createElement(type: string, props: any) {
  const Element: TElement = elements[type];
  if (!Element) throw new Error(`unknown element of type '${type}'`);
  return new Element(props);
}
