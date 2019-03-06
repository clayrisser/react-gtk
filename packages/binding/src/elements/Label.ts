import PropTypes from 'prop-types';
import Gtk from '../gtk';
import Element from './Element';

export default class Label extends Element {
  static propTypes = {
    angle: PropTypes.number,
    attributes: PropTypes.object,
    cursorPosition: PropTypes.number,
    ellipsize: PropTypes.object,
    justify: PropTypes.object,
    label: PropTypes.string,
    lines: PropTypes.number,
    maxWidthChars: PropTypes.number,
    mnemonicKeyval: PropTypes.number,
    mnemonicWidget: PropTypes.object,
    pattern: PropTypes.string,
    selectable: PropTypes.bool,
    selectionBound: PropTypes.number,
    singleLineMode: PropTypes.bool,
    trackVisitedLinks: PropTypes.bool,
    useMarkup: PropTypes.bool,
    useUnderline: PropTypes.bool,
    widthChars: PropTypes.number,
    wrap: PropTypes.bool,
    wrapMode: PropTypes.object,
    xalign: PropTypes.number,
    yalign: PropTypes.number,
    xpad: PropTypes.number,
    ypad: PropTypes.number
  };

  static defaultProps = {
    angle: null,
    attributes: null,
    cursorPosition: null,
    ellipsize: null,
    justify: null,
    label: null,
    lines: null,
    maxWidthChars: null,
    mnemonicKeyval: null,
    mnemonicWidget: null,
    pattern: null,
    selectable: null,
    selectionBound: null,
    singleLineMode: null,
    trackVisitedLinks: null,
    useMarkup: null,
    useUnderline: null,
    widthChars: null,
    wrap: null,
    wrapMode: null,
    xalign: null,
    yalign: null,
    xpad: null,
    ypad: null
  };

  constructor(props: object = {}) {
    super(new Gtk.Label(), props);
  }

  selectRegion(startOffset: number, endOffset: number): null {
    return this.node.selectRegion(startOffset, endOffset);
  }
}
