# SearchBar

## Overview

The `SearchBar` component in `React-GTK` provides a flexible and interactive search input element, seamlessly integrating with `GTK4`. It extends GTK4's `Gtk.SearchBar` functionality and serves as a valuable tool for incorporating search features into your React applications.

## Usage

The `SearchBar` component in React-GTK extends GTK4's `Gtk.SearchBar`, inheriting from the `Element` class. It accepts properties from `StyleProps` and `SearchBarGObjectProps`, offering customization options for appearance and behavior. The standard React `children` prop allows the inclusion of additional nodes or components within the search bar.

```jsx
import React from 'react';
import { SearchBar, Box, Label } from '@react-gtk/core';

export const SearchBarDemo = () => {
  return (
    <Box>
      <SearchBar>
        <Label>Your Search Label:</Label>
      </SearchBar>
    </Box>
  );
};
```
