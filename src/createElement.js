import elements from './elements';

export default function createElement(type, props) {
  const Element = elements[type];
  if (!Element) throw new Error(`unknown element of type '${type}'`);
  return new Element(props);
}
