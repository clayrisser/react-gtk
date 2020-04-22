import { Instance } from '@react-gtk/core';
import Box from './Box';
import Label from './Label';
import Window from './Window';
import createElement from './createElement';

export interface Elements {
  [key: string]: typeof Instance;
}

export * from './constants';
export * from './types';

export { createElement };
export default { Box, Label, Window } as Elements;
