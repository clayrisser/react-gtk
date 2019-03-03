# react-gtk

[![GitHub stars](https://img.shields.io/github/stars/codejamninja/react-gtk.svg?style=social&label=Stars)](https://github.com/codejamninja/react-gtk)

> React bridge for gtk desktop applications

Please ★ this repo if you found it useful ★ ★ ★


## Installation

#### 1. Install Gtk

##### Ubuntu
```sh
sudo apt-get install \
  build-essential git \
  nodejs \
  gobject-introspection \
  libgirepository1.0-dev
```

##### ArchLinux
```sh
pacman -S --needed \
  base-devel git \
  nodejs npm \
  gtk3 gobject-introspection
```

##### OSX
```sh
brew install git node gobject-introspection gtk+3
```

#### 2. Install react-gtk
```sh
npm install --save react-gtk
```


## Dependencies

* [NodeJS](https://nodejs.org)
* [GTK](https://www.gtk.org)


## Usage

_index.js_
```js
import React, { Component } from 'react';
import { render, Button } from 'react-gtk';

class Example extends Component {
  render() {
    return <Button label="Hello, world!" />;
  }
}

render(<Example />);
```

```sh
node ./index.js
```


## Support

Submit an [issue](https://github.com/codejamninja/react-gtk/issues/new)


## Screenshots

[Contribute](https://github.com/codejamninja/react-gtk/blob/master/CONTRIBUTING.md) a screenshot


## Contributing

Review the [guidelines for contributing](https://github.com/codejamninja/react-gtk/blob/master/CONTRIBUTING.md)


## License

[MIT License](https://github.com/codejamninja/react-gtk/blob/master/LICENSE)

[Jam Risser](https://codejam.ninja) © 2018


## Changelog

Review the [changelog](https://github.com/codejamninja/react-gtk/blob/master/CHANGELOG.md)


## Credits

* [Jam Risser](https://codejam.ninja) - Author


## Support on Liberapay

A ridiculous amount of coffee ☕ ☕ ☕ was consumed in the process of building this project.

[Add some fuel](https://liberapay.com/codejamninja/donate) if you'd like to keep me going!

[![Liberapay receiving](https://img.shields.io/liberapay/receives/codejamninja.svg?style=flat-square)](https://liberapay.com/codejamninja/donate)
[![Liberapay patrons](https://img.shields.io/liberapay/patrons/codejamninja.svg?style=flat-square)](https://liberapay.com/codejamninja/donate)
