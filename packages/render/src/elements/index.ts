import Hello from './Hello';
import Howdy from './Howdy';
import Wrapper from './Wrapper';
import { IElement } from './BaseElement';

export interface Elements {
  [key: string]: IElement;
}

export { Hello, Howdy, Wrapper };
export default {
  Hello,
  Howdy,
  Wrapper,
} as Elements;
