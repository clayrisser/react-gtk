# Label

The `Label` component in React-GTK is a fundamental element for displaying text within your graphical user interface. It extends GTK4's label functionality and seamlessly integrates with React, providing a flexible and declarative approach to incorporating text content in your applications.

The `Label` component inherits from the `Element` class in React-GTK, which, in turn, extends GTK4's `Gtk.Label`. It accepts various properties from both `StyleProps` and `LabelGObjectProps`, allowing developers to customize the appearance and behavior of the label. The `Label` component supports child elements through the standard React `children` prop, enabling you to include additional React nodes or components within the label.

# Props

- **children**: ReactNode
- A standard React prop allowing you to include child elements within the label.

- **ref**
  - A React ref for accessing the underlying GTK `Label` instance.

_Additional props inherited from `StyleProps` and `LabelGObjectProps` provide customization options for styling and GTK-specific features._

## Example

```jsx
import React from 'react';
import { Label } from 'path-to-your-label-component';

const MyLabelComponent = () => {
  return (
    <Label labelProp="Your Label Text" style={{ fontSize: '14px', color: '#333' }}>
      {/* Additional child elements or text */}
    </Label>
  );
};

export default MyLabelComponent;
```
