---
sidebar_position: 1
---

# React-GTK with GTK4: Quick Start

Discover the power of React-GTK with GTK4 in less than 5 minutes.

## Introduction

Welcome to React-GTK, a powerful framework that seamlessly integrates GTK4 with React, empowering developers to build robust and customizable graphical user interfaces. This guide will walk you through the essential steps to get started with React-GTK.

## What is React-GTK?

React-GTK is a specialized framework that extends GTK4 to leverage the React library for building user interfaces. It enables developers to harness the strengths of both GTK4 and React, combining the rich set of GTK widgets with the declarative and component-based approach of React. This integration facilitates a more intuitive and efficient development process, empowering developers to create sophisticated applications with ease.

## Widgets in React-GTK

At the core of React-GTK are GTK widgets enhanced with React's component-based architecture. These widgets serve as the fundamental building blocks for constructing your application's user interface. Whether you're working with buttons, input fields, or complex data visualization components, React-GTK provides a seamless integration that allows you to compose your UI using familiar React patterns.

## Prerequisites

Before diving into React-GTK, ensure that you have the necessary dependencies installed:

### GTK4 Development Libraries

```bash
# Install GTK4 development libraries on Linux (example using apt)
sudo apt-get install libgtk-4-dev

# Install GTK4 development libraries on macOS (example using Homebrew)
brew install gtk4
```

## Install React-GTK

```bash
# Using npm
npm install @react-gtk/core

# Using yarn
yarn add @react-gtk/core
```

### Creating Your First React-GTK Application

Now that you have React-GTK and GTK4 installed, let's create a simple React-GTK application.

```jsx
import React from 'react';
import { render } from 'react-dom';
import { Window, Label } from '@react-gtk/core';

const App = () => {
  return (
    <Window title="My React-GTK App" defaultWidth={400} defaultHeight={300}>
      <Label>Hello, React-GTK!</Label>
    </Window>
  );
};

render(<App />, document.getElementById('root'));
```

Congratulations! You've successfully set up a basic React-GTK application. Explore the React-GTK documentation for more advanced features, customization options, and detailed component references.
