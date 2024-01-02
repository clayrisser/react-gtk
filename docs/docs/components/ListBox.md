---
id: listbox-component
title: ListBox
description: Learn how to use the custom ListBox component in your React-GTK applications.
---

# ListBox

## Overview for GtkListBox in Gtk4

The GtkListBox widget in React GTK 4 is a flexible container for listing rows of widgets, ideal for creating selectable lists, settings, and more. It supports sorting, filtering, and custom row decorations, making it versatile for various applications.

This widget integrates seamlessly with React, allowing for dynamic and responsive lists in GTK 4 applications.

## Usage

A simple example to demonstrate how to use the ListBox widget in React GTK 4:

```jsx
import React from 'react';
import Gtk from '@girs/node-gtk-4.0';
import { ListBox, ListBoxRow, Label } from '@react-gtk/core';

function App() {
  return (
    <ListBox>
      <ListBoxRow>
        <Label label="Item 1" />
      </ListBoxRow>
      <ListBoxRow>
        <Label label="Item 2" />
      </ListBoxRow>
    </ListBox>
  );
}

export default App;
```

**Result**

Your application will display a ListBox with two selectable items.

## Properties

List of properties associated with the GtkListBox widget:

- accept_unpaired_release: Determines behavior for releasing a pointer grab.
- accessible_role: The role of the widget in accessibility applications.
- activate_on_single_click: Whether rows are activated with a single click.
- can_focus: Whether the widget can receive focus.
- can_target: Indicates if the widget can be a target for drag-and-drop operations.
- css_classes: A list of CSS classes applied to the widget for styling.
- css_name: The CSS name used for styling the widget.
- cursor: The type of cursor displayed when hovering over the widget.
- focus_on_click: Whether the widget grabs focus when clicked.
- focusable: Determines if the widget can be focused via keyboard navigation.
- g_type_instance: Instance of GObject's type system for this widget.
- halign: Horizontal alignment of the widget within its container.
- has_default: Indicates if the widget is the default widget within its top-level.
- has_focus: Shows if the widget currently has focus.
- has_tooltip: Determines if the widget has a tooltip.
- height_request: The desired height of the widget.
- hexpand: Whether the widget should expand horizontally within its container.
- hexpand_set: Whether the hexpand property has been explicitly set.
- layout_manager: Manages the layout of child widgets.
- margin_bottom: Bottom margin of the widget.
- margin_end: Right (or left in RTL languages) margin of the widget.
- margin_start: Left (or right in RTL languages) margin of the widget.
- margin_top: Top margin of the widget.
- name: A unique name for the widget.
- opacity: Transparency level of the widget.
- overflow: How content that doesn't fit in the widget is handled.
- parent: Reference to the widget's parent.
- parent_instance: Instance of the parent widget.
- receives_default: If true, the widget receives the default action when activated.
- root: The root widget in the widget hierarchy.
- scale_factor: Scaling factor for high DPI displays.
- selection_mode: Determines how selection is done (none, single, multiple).
- sensitive: If true, the widget responds to user interactions.
- show_separators: Whether separators are shown between rows.
- tooltip_markup: Markup text for the widget's tooltip.
- tooltip_text: Plain text for the widget's tooltip.
- valign: Vertical alignment of the widget within its container.
- vexpand: Whether the widget should expand vertically within its container.
- vexpand_set: Whether the vexpand property has been explicitly set.
- visible: If true, the widget is visible.
- width_request: The desired width of the widget.
- $gtype: The GObject type identifier for the widget.
- name: (listed twice) A unique name for the widget, used for identification.

This guide provides a detailed look at the GtkListBox in GTK 4 and its integration with React Native GTK4 for building native GTK4 applications using React.
