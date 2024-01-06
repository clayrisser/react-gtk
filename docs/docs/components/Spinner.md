# Spinner

## Overview

The `Spinner` component in `React-GTK` seamlessly integrates with `GTK4`, providing a dynamic and visually engaging element for indicating loading or processing activities. It extends GTK4's `Gtk.Spinner` functionality and offers a declarative approach within React applications.

## Usage

The `Spinner` component in React-GTK extends GTK4's `Gtk.Spinner`, inheriting from the `Element` class. It supports customization through properties from `StyleProps` and `SpinnerGObjectProps`, while also accommodating child elements via the standard React `children` prop.

```jsx
import React from 'react';
import { Spinner, Box } from '@react-gtk/core';
import Gtk from '@girs/node-gtk-4.0';

export const SpinnerDemo = () => {
  return (
    <Box valign={Gtk.Align.CENTER} halign={Gtk.Align.CENTER}>
      <Spinner spinning sizeRequest={[50, 100]} />
    </Box>
  );
};
```

## Result

![](../../assets/Spinner.png)

## Properties

- **accessibleRole**: Specifies the accessible role of the spinner for accessibility purposes.
- **canFocus**: Indicates whether the spinner can receive keyboard focus.
- **canTarget**: Indicates whether the spinner can be a target for other widgets.
- **cssClasses**: CSS classes applied to the spinner for styling.
- **cssName**: The CSS name of the spinner.
- **cursor**: The cursor to be displayed when hovering over the spinner.
- **focusOnClick**: Determines if the spinner should grab focus when clicked.
- **focusable**: Indicates whether the spinner is focusable.
- **gTypeInstance**: The underlying GObject type instance.
- **halign**: Horizontal alignment of the spinner's contents.
- **hasDefault**: Indicates whether the spinner is the default widget within its parent.
- **hasFocus**: Indicates whether the spinner currently has focus.
- **hasTooltip**: Determines if the spinner has an associated tooltip.
- **heightRequest**: Specifies the preferred height of the spinner.
- **hexpand**: Whether the spinner expands horizontally to fill available space.
- **hexpandSet**: Indicates whether the horizontal expansion is explicitly set.
- **layoutManager**: The layout manager used to arrange child widgets.
- **marginBottom**: The margin at the bottom of the spinner.
- **marginEnd**: The margin at the end (right in LTR, left in RTL) of the spinner.
- **marginStart**: The margin at the start (left in LTR, right in RTL) of the spinner.
- **marginTop**: The margin at the top of the spinner.
- **name**: The name of the spinner.
- **opacity**: The opacity level of the spinner.
- **overflow**: Controls how content should be displayed when it overflows.
- **parent**: The parent container of the spinner.
- **parentInstance**: The parent instance of the spinner.
- **receivesDefault**: Determines if the spinner should receive the default action when activated.
- **root**: The top-level parent container of the spinner.
- **scaleFactor**: The scale factor applied to the spinner's contents.
- **sensitive**: Indicates whether the spinner responds to user input.
- **spinning**: Indicates whether the spinner is currently in a spinning state.
- **tooltipMarkup**: Markup text for the spinner's tooltip.
- **tooltipText**: Plain text for the spinner's tooltip.
- **valign**: Vertical alignment of the spinner's contents.
- **vexpand**: Whether the spinner expands vertically to fill available space.
- **vexpandSet**: Indicates whether the vertical expansion is explicitly set.
- **visible**: Determines if the spinner is visible.
- **widthRequest**: Specifies the preferred width of the spinner.
- **$gtype**: The GObject type of the spinner.
- **name**: The name of the spinner.
