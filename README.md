# react-gtk

[![Financial Contributors on Open Collective](https://opencollective.com/reactgtk/all/badge.svg?label=financial+contributors)](https://opencollective.com/reactgtk) [![GitHub stars](https://img.shields.io/github/stars/codejamninja/react-gtk.svg?style=social&label=Stars)](https://github.com/codejamninja/react-gtk)

> cross-platform react native desktop applications

Please ★ this repo if you found it useful ★ ★ ★

Built with [Node GTK](https://github.com/romgrk/node-gtk)

## GTK 4.0 Support Coming Soon!

After a few years away from this project, I have finally returned. I will
be refactoring the entire project from scratch to reach general availablilty.
The new refactor will support [GTK 4.0](https://blog.gtk.org/2020/12/16/gtk-4-0/)
and CSS using [Yoga](https://yogalayout.com).

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

### Gtk 3

Make sure you have gtk 3 installed on your operating system.

#### Ubuntu

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
git clone https://github.com/codejamninja/react-gtk.git
cd react-gtk/examples/elements
npm install
npm run start
```

## Support

Submit an [issue](https://github.com/codejamninja/react-gtk/issues/new)


## Screenshots

[Contribute](https://github.com/codejamninja/react-gtk/blob/master/CONTRIBUTING.md) a screenshot


## Contributing

Review the [guidelines for contributing](https://github.com/codejamninja/react-gtk/blob/master/CONTRIBUTING.md)


## Contributors

### Code Contributors

This project exists thanks to all the people who contribute. [[Contribute](CONTRIBUTING.md)].
<a href="https://github.com/codejamninja/react-gtk/graphs/contributors"><img src="https://opencollective.com/reactgtk/contributors.svg?width=890&button=false" /></a>

### Financial Contributors

Become a financial contributor and help us sustain our community. [[Contribute](https://opencollective.com/reactgtk/contribute)]

#### Individuals

<a href="https://opencollective.com/reactgtk"><img src="https://opencollective.com/reactgtk/individuals.svg?width=890"></a>

#### Organizations

Support this project with your organization. Your logo will show up here with a link to your website. [[Contribute](https://opencollective.com/reactgtk/contribute)]

<a href="https://opencollective.com/reactgtk/organization/0/website"><img src="https://opencollective.com/reactgtk/organization/0/avatar.svg"></a>
<a href="https://opencollective.com/reactgtk/organization/1/website"><img src="https://opencollective.com/reactgtk/organization/1/avatar.svg"></a>
<a href="https://opencollective.com/reactgtk/organization/2/website"><img src="https://opencollective.com/reactgtk/organization/2/avatar.svg"></a>
<a href="https://opencollective.com/reactgtk/organization/3/website"><img src="https://opencollective.com/reactgtk/organization/3/avatar.svg"></a>
<a href="https://opencollective.com/reactgtk/organization/4/website"><img src="https://opencollective.com/reactgtk/organization/4/avatar.svg"></a>
<a href="https://opencollective.com/reactgtk/organization/5/website"><img src="https://opencollective.com/reactgtk/organization/5/avatar.svg"></a>
<a href="https://opencollective.com/reactgtk/organization/6/website"><img src="https://opencollective.com/reactgtk/organization/6/avatar.svg"></a>
<a href="https://opencollective.com/reactgtk/organization/7/website"><img src="https://opencollective.com/reactgtk/organization/7/avatar.svg"></a>
<a href="https://opencollective.com/reactgtk/organization/8/website"><img src="https://opencollective.com/reactgtk/organization/8/avatar.svg"></a>
<a href="https://opencollective.com/reactgtk/organization/9/website"><img src="https://opencollective.com/reactgtk/organization/9/avatar.svg"></a>

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
