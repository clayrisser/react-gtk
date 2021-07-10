# react-gtk

[![Financial Contributors on Open Collective](https://opencollective.com/reactgtk/all/badge.svg?label=financial+contributors)](https://opencollective.com/reactgtk) [![GitHub stars](https://img.shields.io/github/stars/silicon-hills/react-gtk.svg?style=social&label=Stars)](https://github.com/silicon-hills/react-gtk)

> cross-platform react native desktop applications

Please ★ this repo if you found it useful ★ ★ ★

Built with [Node GTK](https://github.com/romgrk/node-gtk)

## Built by Silicon Hills LLC

[siliconhills.dev](https://siliconhills.dev)

Silicon Hills offers premium Node and React development and support services. Get in touch at [siliconhills.dev](https://siliconhills.dev).

## [FILE ISSUE](https://github.com/silicon-hills/react-gtk/issues/new)

This project is under active development. Please help by sharing your
experience, bugs, comments, complaints, etc . . .

If you think it, say it :laughing:

## Features

- supports native osx desktop
- supports native linux desktop
- supports native windows desktop

## Installation

```sh
npm install --save @react-gtk/binding
```

## Dependencies

- [NodeJS](https://nodejs.org)
- [GTK](https://www.gtk.org)
- [GObject Introspection](https://wiki.gnome.org/Projects/GObjectIntrospection)

### Gtk 3

Make sure you have gtk 3 installed on your operating system.

#### Debian/Ubuntu

```sh
sudo apt install libgtk-3-dev
```

#### OSX

```sh
brew install gtk+3
```

## Usage

```js
import React, { Component } from 'react';
import { render, Button, Box } from '@react-gtk/binding';

class App extends Component {
  render() {
    return (
      <Box>
        <Button label="One" />
        <Button label="Two" />
      </Box>
    );
  }
}

render(<App />, 'My App');
```

## Example

```sh
git clone https://github.com/silicon-hills/react-gtk.git
cd react-gtk/examples/elements
npm install
npm run start
```

## Support

Submit an [issue](https://github.com/silicon-hills/react-gtk/issues/new)

## License

[Apache-2.0 License](https://github.com/silicon-hills/react-gtk/blob/master/LICENSE)

[Silicon Hills LLC](https://siliconhills.dev) © Copyright 2019-2021

## Credits

- [Clay Risser](https://clayrisser.com) - Author
