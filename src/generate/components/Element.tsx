import React, { FC } from 'react';
import camelcase from 'lodash.camelcase';
import { Class, ClassMethod, ClassProperty } from 'react-ast';
import { Klass, Method, Property } from '~/generate/types';
import { lookupTable, lookupType } from '~/generate/typeLookup';

export interface ElementProps {
  klass: Klass;
}

const Element: FC<ElementProps> = (props: ElementProps) => {
  function renderMethods() {
    return props.klass.methods.map((method: Method) =>
      method.name ? (
        <ClassMethod
          id={camelcase(method.name)}
          {...(method.returnValue?.type
            ? { returnType: lookupType(method.returnValue.type.name) }
            : {})}
        />
      ) : (
        <></>
      )
    );
  }

  function renderProperties() {
    return props.klass.properties.map((property: Property) =>
      property.name ? (
        <ClassProperty
          id={camelcase(property.name)}
          {...(property.type?.name
            ? { typeAnnotation: lookupType(property.type.name) }
            : {})}
        />
      ) : (
        <></>
      )
    );
  }

  return (
    <Class name={props.klass.name || ''}>
      {renderProperties()}
      {renderMethods()}
    </Class>
  );
};

export default Element;
