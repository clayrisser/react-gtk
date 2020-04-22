import { ReactNode, Ref } from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      Box: {
        ref?: Ref<any>;
        children?: ReactNode;
      };
      Label: {
        children?: string;
        label?: string;
        ref?: Ref<any>;
      };
      Window: {
        ref?: Ref<any>;
        children?: ReactNode;
      };
    }
  }
}
