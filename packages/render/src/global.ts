import { ReactNode, Ref } from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      Box: {
        ref?: Ref<any>;
        children?: ReactNode;
      };
      Window: {
        ref?: Ref<any>;
        children?: ReactNode;
      };
    }
  }
}
