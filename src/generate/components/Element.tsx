import React, { FC } from 'react';
import camelcase from 'lodash.camelcase';
import {
  Class,
  ClassMethod,
  ClassProperty,
  Export,
  TypeAnnotation,
  TypeParameterInstantiation,
  TypeReference
} from 'react-ast';
import { Klass, Method, Property } from '~/generate/types';
import { lookupType } from '~/generate/typeLookup';

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
    <Export default>
      <Class name={props.klass.name || ''} extends="Element">
        <ClassProperty
          static
          id="defaultProps"
          typeAnnotation={
            <TypeAnnotation>
              <TypeReference name="Partial">
                <TypeParameterInstantiation>
                  <TypeReference
                    name={`JSX.IntrinsicElement['${props.klass.name}']`}
                  />
                </TypeParameterInstantiation>
              </TypeReference>
            </TypeAnnotation>
          }
        >
          {{}}
        </ClassProperty>

        {renderProperties()}
        {renderMethods()}
      </Class>
    </Export>
  );
};

export default Element;
