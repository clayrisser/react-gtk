---
id: image-component
title: Image
description: Learn how to use the custom Image component in your React-GTK applications.
---

# Image

## Overview for GtkImage in Gtk4

The GtkImage widget in React GTK 4 is a versatile component designed to to display images in your desktop applications. It supports various sources like files, icons, and resources, providing flexibility in how you handle image assets.

This widget simplifies the displaying of images in GTK 4 applications developed with React, making it a fundamental building block for user interfaces.

## Usage

A simple example to demonstrate how to use GtkButton widget in React GTK 4:

```jsx

import React from 'react';
import Gtk from '@girs/node-gtk-4.0';
import { Image, Box, Label } from '@react-gtk/core';

function App() {
  return (
    <Box style={{ backgroundColor: 'lightgray' }}>
    <Label label="Welcome to GtkImage Component" halign={Gtk.Align.CENTER} />
       <Image
        fromFile="/docs/assets/box.png"
        canFocus={true}
        halign={Gtk.Align.CENTER}
        valign={Gtk.Align.CENTER}
        visible={true}
        tooltipText="This is an image"
        sizeRequest={[100, 200]}
      />
    </Box>
  );
}

export default App;

```

## Result

Some issue image is not displaying(need to fix it)


_This comprehensive guide covers everything you need to know about using the 
 GtkImage in GTK 4 and its integration with React Native GTK4 for building native GTK4 applications using React._

## Properties

List of properties associated with the GtkImage widget:

- accessible_role: Defines the role of this widget in accessibility applications.
- can_focus: Determines if the widget can receive focus.
- can_target: Indicates if the widget can be a target for drag-and-drop.
- css_classes: A list of CSS classes applied to the widget.
- css_name: The name used to apply CSS styles to the widget.
- cursor: The type of cursor displayed when over the widget.
- file: The file path of the image displayed in the widget.
- focus_on_click: Whether the widget grabs focus when clicked.
- focusable: Determines if the widget can be focused via keyboard navigation.
- g_type_instance: Instance of GObject's type system for this widget.
- gicon: The GIcon displayed in the widget.
- halign: Horizontal alignment of the widget in its container.
- has_default: Indicates if the widget is the default widget within its top-level.
- has_focus: Indicates if the widget currently has focus.
- has_tooltip: Determines if the widget has a tooltip.
- height_request: The desired height of the widget.
- hexpand: Whether the widget should expand horizontally.
- hexpand_set: Whether the hexpand property has been explicitly set.
- icon_name: Name of the icon used in the widget.
- icon_size: The size of the icon displayed in the widget.
- layout_manager: Manages the layout of child widgets.
- margin_bottom: Margin at the bottom of the widget.
- margin_end: Margin at the end (right in LTR, left in RTL) of the widget.
- margin_start: Margin at the start (left in LTR, right in RTL) of the widget.
- margin_top: Margin at the top of the widget.
- name: A unique name for the widget.
- opacity: Transparency level of the widget.
- overflow: How content that doesn't fit in the widget is handled.
- paintable: Indicates if the widget can be painted/drawn.
- parent: Reference to the widget's parent.
- parent_instance: Instance of the parent widget.
- pixel_size: Size of the image in pixels.
- receives_default: If true, the widget receives the default action when activated.
- resource: The resource path of the image.
- root: The root widget in the widget hierarchy.
- scale_factor: Scaling factor for high DPI displays.
- sensitive: If true, the widget responds to user interactions.
- storage_type: Type of storage used for the image data.
- tooltip_markup: Markup text for the widget's tooltip.
- tooltip_text: Plain text for the widget's tooltip.
- use_fallback: Whether to use a fallback icon or image.
- valign: Vertical alignment of the widget in its container.
- vexpand: Whether the widget should expand vertically.
- vexpand_set: Whether the vexpand property has been explicitly set.
- visible: If true, the widget is visible.
- width_request: The desired width of the widget.
- $gtype: The GObject type identifier for the widget.
- name: (listed twice) A unique name for the widget, used for identification.
