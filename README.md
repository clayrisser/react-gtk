# react-gtk

[![GitHub stars](https://img.shields.io/github/stars/codejamninja/react-gtk.svg?style=social&label=Stars)](https://github.com/codejamninja/react-gtk)

> cross-platform react native desktop applications

Please ★ this repo if you found it useful ★ ★ ★

Built with [Node GTK](https://github.com/romgrk/node-gtk)

## [FILE ISSUE](https://github.com/codejamninja/react-gtk/issues/new)
This project is under active development. Please help by sharing your
expirience, bugs, comments, complaints, etc . . .

If you think it, say it :laughing:

## Features

* supports native osx desktop
* supports native linux desktop
* supports native windows desktop


## Installation

```sh
npm install --save @react-gtk/binding
```


## Dependencies

* [NodeJS](https://nodejs.org)
* [GTK](https://www.gtk.org)
* [GObject Introspection](https://wiki.gnome.org/Projects/GObjectIntrospection)


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


## Support

Submit an [issue](https://github.com/codejamninja/react-gtk/issues/new)


## Screenshots

[Contribute](https://github.com/codejamninja/react-gtk/blob/master/CONTRIBUTING.md) a screenshot


## Contributing

Review the [guidelines for contributing](https://github.com/codejamninja/react-gtk/blob/master/CONTRIBUTING.md)


## License

[MIT License](https://github.com/codejamninja/react-gtk/blob/master/LICENSE)

[Jam Risser](https://codejam.ninja) © 2019


## Changelog

Review the [changelog](https://github.com/codejamninja/react-gtk/blob/master/CHANGELOG.md)


## Credits

* [Jam Risser](https://codejam.ninja) - Author


## Support on Liberapay

A ridiculous amount of coffee ☕ ☕ ☕ was consumed in the process of building this project.

[Add some fuel](https://liberapay.com/codejamninja/donate) if you'd like to keep me going!

[![Liberapay receiving](https://img.shields.io/liberapay/receives/codejamninja.svg?style=flat-square)](https://liberapay.com/codejamninja/donate)
[![Liberapay patrons](https://img.shields.io/liberapay/patrons/codejamninja.svg?style=flat-square)](https://liberapay.com/codejamninja/donate)
