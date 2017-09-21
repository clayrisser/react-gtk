import { App, Button } from 'node-gtk3';

const app = new App({
  title: 'Node Gtk',
  namespace: 'org.gtk.example',
  width: 200,
  height:  200
});

app.init().then((window) => {
  const button = new Button({
    label: 'Button 1',
    opacity: .1,
    height: 100,
    width: 50
  });
  button.onClicked = () => {
    console.log('Button was clicked');
  };
  button.onActivate = () => {
    console.log('Button was activated');
  };
  button.onEnter = () => {
    console.log('Button was entered');
  };
  button.onLeave = () => {
    console.log('Button was left');
  };
  button.onPressed = () => {
    console.log('Button was pressed');
  };
  button.onReleased = () => {
    console.log('Button was released');
  };
  button.attach(window);
  app.render();
});
