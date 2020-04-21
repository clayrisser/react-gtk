import BaseElement from './BaseElement';
import { Props } from '../types';

export default class Howdy extends BaseElement {
  static propTypes: object;

  static defaultProps: Props;

  constructor(props: Props = {}) {
    super({ howdy: 'texas' }, props);
  }
}
