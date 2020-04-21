import { IElement } from './BaseElement';
import Window from './Window';

export interface Elements {
  [key: string]: IElement;
}

export { Window };
export default { Window } as Elements;
