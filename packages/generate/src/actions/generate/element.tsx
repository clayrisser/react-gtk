import React from 'react';
import {
  CallExpression,
  ClassDeclaration,
  ClassMethod,
  ClassProperty,
  Constructor,
  ExportDefaultDeclaration,
  ImportDeclaration,
  Literal,
  Param,
  ReturnStatement,
  Smart,
  render
} from 'react-ast';
import {
  Element,
  ElementPropType,
  ElementMethod,
  Parameter
} from '../../gtkGir';

export default function generateElement(element: Element): string {
  function renderMethods(methods: ElementMethod[]) {
    return methods.map((method: ElementMethod) => (
      <ClassMethod
        name={method.name}
        returnType={method.returnType}
        params={method.parameters.map((parameter: Parameter) => {
          return <Param type={parameter.type}>{parameter.name}</Param>;
        })}
      >
        <ReturnStatement>
          <CallExpression
            name={`this.node.${method.name}`}
            arguments={method.parameters.map(
              (parameter: Parameter) => parameter.name
            )}
          />
        </ReturnStatement>
      </ClassMethod>
    ));
  }

  function renderPropTypes(propTypes: ElementPropType[]) {
    return (
      <ClassProperty static name="propTypes" type="WeakValidationMap<any>">
        <Smart
          code={
            'const c = {' +
            propTypes.reduce(
              (propTypesString: string, propType: ElementPropType) => {
                propTypesString = `${propTypesString}
${propType.name}: PropTypes.${propType.type},
              `;
                return propTypesString;
              },
              ''
            ) +
            '}'
          }
          scopePath="declarations.0.init"
        />
      </ClassProperty>
    );
  }

  function renderDefaultProps(propTypes: ElementPropType[]) {
    return (
      <ClassProperty static name="defaultProps" type="Props">
        <Literal>
          {propTypes.reduce(
            (propTypes: { [key: string]: any }, propType: ElementPropType) => {
              propTypes[propType.name] = null;
              return propTypes;
            },
            {}
          )}
        </Literal>
      </ClassProperty>
    );
  }

  return render(
    <>
      <ImportDeclaration exports={['WeakValidationMap']} source="react" />
      <ImportDeclaration defaultExport="PropTypes" source="prop-types" />
      <ImportDeclaration
        exports={['BaseElement', 'Gtk', 'Props']}
        source="@react-gtk/core"
      />
      <ExportDefaultDeclaration>
        <ClassDeclaration
          name={element.klass.name}
          superClassName="BaseElement<Gtk.Box>"
        >
          {renderDefaultProps(element.propTypes)}
          {renderPropTypes(element.propTypes)}
          {renderMethods(element.methods)}
          <Constructor
            params={[
              <Param type="Props" default={<Literal>{{}}</Literal>}>
                props
              </Param>
            ]}
          >
            <CallExpression
              name="super"
              arguments={['new Gtk.Box()', 'props']}
            />
          </Constructor>
        </ClassDeclaration>
      </ExportDefaultDeclaration>
    </>,
    {
      parserOptions: {
        plugins: ['jsx', 'classProperties', 'typescript']
      },
      prettier: {
        singleQuote: true,
        trailingComma: 'none'
      }
    }
  );
}
