import Box from './Box';
import Window from './Window';
import Label from './Label';
import { Instance } from '../types';

export interface Elements {
  [key: string]: typeof Instance;
}

export { Box, Label, Window };
export default { Box, Label, Window } as Elements;
