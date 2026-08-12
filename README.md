# react-gtk

[![Financial Contributors on Open Collective](https://opencollective.com/reactgtk/all/badge.svg?label=financial+contributors)](https://opencollective.com/reactgtk)

> build native desktop applications with react and gtk4

react-gtk is a react renderer for [GTK 4](https://www.gtk.org). It drives real
GTK widgets through [node-gtk](https://github.com/romgrk/node-gtk) (GObject
Introspection bindings for Node.js), supports flexbox layout via
[Yoga](https://www.yogalayout.dev), and styles widgets with CSS-like style
props.

## [JOIN DISCORD](https://discord.gg/UBrXPfFnF3)

This project is under active development. Please help by sharing your
experience, bugs, comments, complaints, etc . . .

If you think it, say it :laughing:

## Usage

```tsx
import React from 'react';
import Gtk from '@girs/node-gtk-4.0';
import { Box, Button, render } from '@react-gtk/core';

function App() {
  return (
    <Box orientation={Gtk.Orientation.VERTICAL}>
      <Button
        label="Click Me!"
        onClicked={() => {
          console.log('button was clicked');
        }}
      />
    </Box>
  );
}

render(<App />);
```

## Dependencies

- [Node.js](https://nodejs.org) >= 20.19
- [GTK 4](https://www.gtk.org)
- [GObject Introspection](https://gi.readthedocs.io)

### Ubuntu

```sh
sudo apt install libgtk-4-dev libgirepository1.0-dev gobject-introspection
```

### macOS

```sh
brew install gtk4 gobject-introspection
```

## Development

The repo is a pnpm workspace wrapped in make. The toolchain is pinned in
`.tool-versions` (asdf).

```sh
make prepare    # one-time machine setup (asdf toolchain + pnpm install)
make build      # generate widget bindings and build the packages
make test       # run the unit tests
make typecheck  # typecheck every workspace package
make lint       # oxlint
make format     # oxfmt
```

The widget elements in `@react-gtk/core` are generated from your system's
`Gtk-4.0.gir` by `@react-gtk/generate` (see `packages/core/src/generated`,
which is gitignored). If your gir files live somewhere unusual, point the
generator at them with the `GIR_DIRECTORIES` environment variable
(path-delimiter separated).

Run the examples with a working GTK 4 installation:

```sh
make examples/todo/dev
```

> **note:** running apps (as opposed to building the packages) requires the
> node-gtk native binding. pnpm skips dependency build scripts by default, so
> allow it with `pnpm approve-builds` if you need the runtime.

## Packages

| package                                    | description                                      |
| ------------------------------------------ | ------------------------------------------------ |
| [`@react-gtk/core`](packages/core)         | the react renderer and generated widget elements |
| [`@react-gtk/generate`](packages/generate) | generates widget elements from gir files         |

## Support

Submit an [issue](https://gitlab.com/bitspur/misc/react-gtk/-/issues/new)

## Contributing

Become a financial contributor and help us sustain our community.
[[Contribute](https://opencollective.com/reactgtk/contribute)]

## License

[Apache-2.0](LICENSE)

BitSpur (c) Copyright 2017 - 2026
