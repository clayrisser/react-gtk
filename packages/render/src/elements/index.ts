import Box from './Box';
import Window from './Window';
import { Instance } from '../types';

export interface Elements {
  [key: string]: typeof Instance;
}

export { Box, Window };
export default { Box, Window } as Elements;
