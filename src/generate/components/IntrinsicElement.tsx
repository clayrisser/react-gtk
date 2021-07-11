import React, { FC } from 'react';
import {
  Interface,
  PropertySignature,
  TypeAnnotation,
  TypeReference
} from 'react-ast';
import { Klass } from '~/generate/types';

export interface IntrinsicElementProps {
  klasses: Klass[];
}

// TODO: place inside JSX namespace
const IntrinsicElements: FC<IntrinsicElementProps> = (
  props: IntrinsicElementProps
) => {
  function renderPropertySignatures() {
    return props.klasses.map((klass: Klass) =>
      klass.name ? (
        <PropertySignature
          id={klass.name}
          // TODO: use type literal
          typeAnnotation={
            <TypeAnnotation>
              <TypeReference name="string" />
            </TypeAnnotation>
          }
        />
      ) : (
        <></>
      )
    );
  }

  return (
    <Interface name="IntrinsicElements">{renderPropertySignatures()}</Interface>
  );
};

export default IntrinsicElements;
