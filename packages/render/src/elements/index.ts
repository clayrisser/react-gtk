import { Instance } from '../types';
import Window from './Window';

export interface Elements {
  [key: string]: typeof Instance;
}

export { Window };
export default { Window } as Elements;
