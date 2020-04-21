import BaseElement from './BaseElement';
import { Props } from '../types';

export default class Hello extends BaseElement {
  static propTypes: object;

  static defaultProps: Props;

  constructor(props: Props = {}) {
    super({ hello: 'world' }, props);
  }
}
