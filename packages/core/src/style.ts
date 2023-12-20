/*
 *  File: /src/style.ts
 *  Project: @react-gtk/core
 *  File Created: 18-12-2023 12:59:38
 *  Author: Clay Risser
 *  -----
 *  BitSpur (c) Copyright 2017 - 2023
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

export interface StyleProp extends Style {
  '&:active'?: GtkStyle;
  '&:backdrop'?: GtkStyle;
  '&:checked'?: GtkStyle;
  '&:disabled'?: GtkStyle;
  '&:focus'?: GtkStyle;
  '&:hover'?: GtkStyle;
  '&:indeterminate'?: GtkStyle;
}

export interface Style extends GtkStyle {
  height?: number | '100%' | 'auto';
  minHeight?: number | '100%' | 'auto';
  minWidth?: number | '100%' | 'auto';
  width?: number | '100%' | 'auto';
}

export interface GtkStyle {
  animation?: string;
  animationDelay?: number;
  animationDirection?: string;
  animationDuration?: number;
  animationFillMode?: string;
  animationIterationCount?: number;
  animationName?: string;
  animationPlayState?: string;
  animationTimingFunction?: string;
  background?: string;
  backgroundBlendMode?: string;
  backgroundClip?: string;
  backgroundColor?: string;
  backgroundImage?: string;
  backgroundOrigin?: string;
  backgroundPosition?: string;
  backgroundRepeat?: string;
  backgroundSize?: number | string;
  border?: string;
  borderBottom?: string;
  borderBottomColor?: string;
  borderBottomLeftRadius?: number | string;
  borderBottomRightRadius?: number | string;
  borderBottomStyle?: string;
  borderBottomWidth?: number | string;
  borderColor?: string;
  borderImage?: string;
  borderImageRepeat?: string;
  borderImageSlice?: string;
  borderImageSource?: string;
  borderImageWidth?: number | string;
  borderLeft?: string;
  borderLeftColor?: string;
  borderLeftStyle?: string;
  borderLeftWidth?: number | string;
  borderRadius?: number | string;
  borderRight?: string;
  borderRightColor?: string;
  borderRightStyle?: string;
  borderRightWidth?: number | string;
  borderSpacing?: number | string;
  borderStyle?: string;
  borderTop?: string;
  borderTopColor?: string;
  borderTopLeftRadius?: number | string;
  borderTopRightRadius?: number | string;
  borderTopStyle?: string;
  borderTopWidth?: number | string;
  borderWidth?: number | string;
  boxShadow?: string;
  caretColor?: string;
  color?: string;
  filter?: string;
  font?: string;
  fontFamily?: string;
  fontFeatureSettings?: string;
  fontKerning?: string;
  fontSize?: number | string;
  fontStretch?: string;
  fontStyle?: string;
  fontVariant?: string;
  fontVariantAlternates?: string;
  fontVariantCaps?: string;
  fontVariantEastAsian?: string;
  fontVariantLigatures?: string;
  fontVariantNumeric?: string;
  fontVariantPosition?: string;
  fontVariationSettings?: string;
  fontWeight?: string;
  gtkDpi?: number;
  gtkIconFilter?: string;
  gtkIconPalette?: string;
  gtkIconShadow?: string;
  gtkIconSize?: number | string;
  gtkIconSource?: string;
  gtkIconStyle?: string;
  gtkIconTransform?: string;
  gtkSecondaryCaretColor?: string;
  letterSpacing?: string;
  lineHeight?: string;
  margin?: string;
  marginBottom?: number | string;
  marginLeft?: number | string;
  marginRight?: number | string;
  marginTop?: number | string;
  minHeight?: number | string;
  minWidth?: number | string;
  opacity?: string;
  outline?: string;
  outlineColor?: string;
  outlineOffset?: number | string;
  outlineStyle?: string;
  outlineWidth?: number | string;
  padding?: string;
  paddingBottom?: number | string;
  paddingLeft?: number | string;
  paddingRight?: number | string;
  paddingTop?: number | string;
  textDecoration?: string;
  textDecorationColor?: string;
  textDecorationLine?: string;
  textDecorationStyle?: string;
  textShadow?: string;
  textTransform?: string;
  transform?: string;
  transformOrigin?: string;
  transition?: string;
  transitionDelay?: number;
  transitionDuration?: number;
  transitionProperty?: string;
  transitionTimingFunction?: string;
}

export enum CssPropertyType {
  String = 'String',
  Number = 'Number',
  NumberOrString = 'NumberOrString',
}

export const psuedoClasses = new Set([
  '&:active',
  '&:backdrop',
  '&:checked',
  '&:disabled',
  '&:focus',
  '&:hover',
  '&:indeterminate',
]);

export const styleProperties: Record<string, { name: string; type: CssPropertyType; defaultUnit?: string }> = {
  animation: { type: CssPropertyType.String, name: 'animation' },
  animationDelay: { type: CssPropertyType.Number, name: 'animation-delay' },
  animationDirection: { type: CssPropertyType.String, name: 'animation-direction' },
  animationDuration: { type: CssPropertyType.Number, name: 'animation-duration' },
  animationFillMode: { type: CssPropertyType.String, name: 'animation-fill-mode' },
  animationIterationCount: { type: CssPropertyType.Number, name: 'animation-iteration-count' },
  animationName: { type: CssPropertyType.String, name: 'animation-name' },
  animationPlayState: { type: CssPropertyType.String, name: 'animation-play-state' },
  animationTimingFunction: { type: CssPropertyType.String, name: 'animation-timing-function' },
  background: { type: CssPropertyType.String, name: 'background' },
  backgroundBlendMode: { type: CssPropertyType.String, name: 'background-blend-mode' },
  backgroundClip: { type: CssPropertyType.String, name: 'background-clip' },
  backgroundColor: { type: CssPropertyType.String, name: 'background-color' },
  backgroundImage: { type: CssPropertyType.String, name: 'background-image' },
  backgroundOrigin: { type: CssPropertyType.String, name: 'background-origin' },
  backgroundPosition: { type: CssPropertyType.String, name: 'background-position' },
  backgroundRepeat: { type: CssPropertyType.String, name: 'background-repeat' },
  backgroundSize: { type: CssPropertyType.NumberOrString, name: 'background-size', defaultUnit: 'px' },
  border: { type: CssPropertyType.String, name: 'border' },
  borderBottom: { type: CssPropertyType.String, name: 'border-bottom' },
  borderBottomColor: { type: CssPropertyType.String, name: 'border-bottom-color' },
  borderBottomStyle: { type: CssPropertyType.String, name: 'border-bottom-style' },
  borderBottomWidth: { type: CssPropertyType.NumberOrString, name: 'border-bottom-width', defaultUnit: 'px' },
  borderColor: { type: CssPropertyType.String, name: 'border-color' },
  borderImage: { type: CssPropertyType.String, name: 'border-image' },
  borderImageRepeat: { type: CssPropertyType.String, name: 'border-image-repeat' },
  borderImageSlice: { type: CssPropertyType.String, name: 'border-image-slice' },
  borderImageSource: { type: CssPropertyType.String, name: 'border-image-source' },
  borderImageWidth: { type: CssPropertyType.NumberOrString, name: 'border-image-width', defaultUnit: 'px' },
  borderLeft: { type: CssPropertyType.String, name: 'border-left' },
  borderLeftColor: { type: CssPropertyType.String, name: 'border-left-color' },
  borderLeftStyle: { type: CssPropertyType.String, name: 'border-left-style' },
  borderLeftWidth: { type: CssPropertyType.NumberOrString, name: 'border-left-width', defaultUnit: 'px' },
  borderRadius: { type: CssPropertyType.NumberOrString, name: 'border-radius', defaultUnit: 'px' },
  borderRight: { type: CssPropertyType.String, name: 'border-right' },
  borderRightColor: { type: CssPropertyType.String, name: 'border-right-color' },
  borderRightStyle: { type: CssPropertyType.String, name: 'border-right-style' },
  borderRightWidth: { type: CssPropertyType.NumberOrString, name: 'border-right-width', defaultUnit: 'px' },
  borderSpacing: { type: CssPropertyType.NumberOrString, name: 'border-spacing', defaultUnit: 'px' },
  borderStyle: { type: CssPropertyType.String, name: 'border-style' },
  borderTop: { type: CssPropertyType.String, name: 'border-top' },
  borderTopColor: { type: CssPropertyType.String, name: 'border-top-color' },
  borderTopLeftRadius: { type: CssPropertyType.NumberOrString, name: 'border-top-left-radius', defaultUnit: 'px' },
  borderTopRightRadius: { type: CssPropertyType.NumberOrString, name: 'border-top-right-radius', defaultUnit: 'px' },
  borderTopStyle: { type: CssPropertyType.String, name: 'border-top-style' },
  borderTopWidth: { type: CssPropertyType.NumberOrString, name: 'border-top-width', defaultUnit: 'px' },
  borderWidth: { type: CssPropertyType.NumberOrString, name: 'border-width', defaultUnit: 'px' },
  boxShadow: { type: CssPropertyType.String, name: 'box-shadow' },
  caretColor: { type: CssPropertyType.String, name: 'caret-color' },
  color: { type: CssPropertyType.String, name: 'color' },
  filter: { type: CssPropertyType.String, name: 'filter' },
  font: { type: CssPropertyType.String, name: 'font' },
  fontFamily: { type: CssPropertyType.String, name: 'font-family' },
  fontFeatureSettings: { type: CssPropertyType.String, name: 'font-feature-settings' },
  fontKerning: { type: CssPropertyType.String, name: 'font-kerning' },
  fontSize: { type: CssPropertyType.NumberOrString, name: 'font-size', defaultUnit: 'px' },
  fontStretch: { type: CssPropertyType.String, name: 'font-stretch' },
  fontStyle: { type: CssPropertyType.String, name: 'font-style' },
  fontVariant: { type: CssPropertyType.String, name: 'font-variant' },
  fontVariantAlternates: { type: CssPropertyType.String, name: 'font-variant-alternates' },
  fontVariantCaps: { type: CssPropertyType.String, name: 'font-variant-caps' },
  fontVariantEastAsian: { type: CssPropertyType.String, name: 'font-variant-east-asian' },
  fontVariantLigatures: { type: CssPropertyType.String, name: 'font-variant-ligatures' },
  fontVariantNumeric: { type: CssPropertyType.String, name: 'font-variant-numeric' },
  fontVariantPosition: { type: CssPropertyType.String, name: 'font-variant-position' },
  fontVariationSettings: { type: CssPropertyType.String, name: 'font-variation-settings' },
  fontWeight: { type: CssPropertyType.String, name: 'font-weight' },
  gtkDpi: { type: CssPropertyType.Number, name: '-gtk-dpi' },
  gtkIconFilter: { type: CssPropertyType.String, name: '-gtk-icon-filter' },
  gtkIconPalette: { type: CssPropertyType.String, name: '-gtk-icon-palette' },
  gtkIconShadow: { type: CssPropertyType.String, name: '-gtk-icon-shadow' },
  gtkIconSize: { type: CssPropertyType.NumberOrString, name: '-gtk-icon-size', defaultUnit: 'px' },
  gtkIconSource: { type: CssPropertyType.String, name: '-gtk-icon-source' },
  gtkIconStyle: { type: CssPropertyType.String, name: '-gtk-icon-style' },
  gtkIconTransform: { type: CssPropertyType.String, name: '-gtk-icon-transform' },
  gtkSecondaryCaretColor: { type: CssPropertyType.String, name: '-gtk-secondary-caret-color' },
  letterSpacing: { type: CssPropertyType.String, name: 'letter-spacing' },
  lineHeight: { type: CssPropertyType.String, name: 'line-height' },
  margin: { type: CssPropertyType.String, name: 'margin' },
  marginBottom: { type: CssPropertyType.NumberOrString, name: 'margin-bottom', defaultUnit: 'px' },
  marginLeft: { type: CssPropertyType.NumberOrString, name: 'margin-left', defaultUnit: 'px' },
  marginRight: { type: CssPropertyType.NumberOrString, name: 'margin-right', defaultUnit: 'px' },
  marginTop: { type: CssPropertyType.NumberOrString, name: 'margin-top', defaultUnit: 'px' },
  minHeight: { type: CssPropertyType.NumberOrString, name: 'min-height', defaultUnit: 'px' },
  minWidth: { type: CssPropertyType.NumberOrString, name: 'min-width', defaultUnit: 'px' },
  opacity: { type: CssPropertyType.String, name: 'opacity' },
  outline: { type: CssPropertyType.String, name: 'outline' },
  outlineColor: { type: CssPropertyType.String, name: 'outline-color' },
  outlineOffset: { type: CssPropertyType.NumberOrString, name: 'outline-offset', defaultUnit: 'px' },
  outlineStyle: { type: CssPropertyType.String, name: 'outline-style' },
  outlineWidth: { type: CssPropertyType.NumberOrString, name: 'outline-width', defaultUnit: 'px' },
  padding: { type: CssPropertyType.String, name: 'padding' },
  paddingBottom: { type: CssPropertyType.NumberOrString, name: 'padding-bottom', defaultUnit: 'px' },
  paddingLeft: { type: CssPropertyType.NumberOrString, name: 'padding-left', defaultUnit: 'px' },
  paddingRight: { type: CssPropertyType.NumberOrString, name: 'padding-right', defaultUnit: 'px' },
  paddingTop: { type: CssPropertyType.NumberOrString, name: 'padding-top', defaultUnit: 'px' },
  textDecoration: { type: CssPropertyType.String, name: 'text-decoration' },
  textDecorationColor: { type: CssPropertyType.String, name: 'text-decoration-color' },
  textDecorationLine: { type: CssPropertyType.String, name: 'text-decoration-line' },
  textDecorationStyle: { type: CssPropertyType.String, name: 'text-decoration-style' },
  textShadow: { type: CssPropertyType.String, name: 'text-shadow' },
  textTransform: { type: CssPropertyType.String, name: 'text-transform' },
  transform: { type: CssPropertyType.String, name: 'transform' },
  transformOrigin: { type: CssPropertyType.String, name: 'transform-origin' },
  transition: { type: CssPropertyType.String, name: 'transition' },
  transitionDelay: { type: CssPropertyType.Number, name: 'transition-delay' },
  transitionDuration: { type: CssPropertyType.Number, name: 'transition-duration' },
  transitionProperty: { type: CssPropertyType.String, name: 'transition-property' },
  transitionTimingFunction: { type: CssPropertyType.String, name: 'transition-timing-function' },
  borderBottomLeftRadius: {
    type: CssPropertyType.NumberOrString,
    name: 'border-bottom-left-radius',
    defaultUnit: 'px',
  },
  borderBottomRightRadius: {
    type: CssPropertyType.NumberOrString,
    name: 'border-bottom-right-radius',
    defaultUnit: 'px',
  },
};

export function buildCssDeclaration(
  style: Record<string, string | number | null>,
  key: string,
  value: string | number | null,
) {
  let cssDeclaration = '';
  if (key?.[0] === '&') return '';
  const property = styleProperties[key];
  if (property?.name) {
    if (typeof value === 'undefined') return '';
    if (value === null) value = 'unset';
    if (key === 'backgroundColor' && !('backgroundImage' in style)) {
      cssDeclaration += '  background-image: none;\n';
    }
    value = typeof value === 'number' && property.defaultUnit ? `${value}${property.defaultUnit}` : value.toString();
    cssDeclaration += `  ${property.name}: ${value};`;
  }
  return cssDeclaration;
}

export interface StyleProps {
  fallbackStyle?: StyleProp;
  style?: StyleProp;
  userStyle?: StyleProp;
}
