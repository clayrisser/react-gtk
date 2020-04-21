import { ReactNode, Ref } from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      Hello: {
        ref?: Ref<any>;
      };
      Howdy: {
        ref?: Ref<any>;
      };
      Wrapper: {
        ref?: Ref<any>;
        children?: ReactNode;
      };
    }
  }
}
