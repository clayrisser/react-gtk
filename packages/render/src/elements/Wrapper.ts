import BaseElement from './BaseElement';
import { Props } from '../types';

export default class Wrapper extends BaseElement {
  static propTypes: object;

  static defaultProps: Props;

  constructor(props: Props = {}) {
    super({ cool: 'beans' }, props);
  }
}
