import { ReactNode, Ref } from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      Window: {
        ref?: Ref<any>;
        children?: ReactNode;
      };
    }
  }
}
