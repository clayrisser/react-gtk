import PropTypes from 'prop-types';
import Gtk from '../gtk';
import Element from './Element';

export default class Entry extends Element {
  static propTypes = {
    activatesDefault: PropTypes.bool,
    attributes: PropTypes.object,
    buffer: PropTypes.object,
    capsLockWarning: PropTypes.bool,
    children: PropTypes.string,
    completion: PropTypes.object,
    cursorPosition: PropTypes.number,
    editable: PropTypes.bool,
    enableEmojiCompletion: PropTypes.bool,
    hasFrame: PropTypes.bool,
    imModule: PropTypes.string,
    innerBorder: PropTypes.object,
    inputPurpose: PropTypes.number,
    invisibleChar: PropTypes.number,
    invisibleCharSet: PropTypes.bool,
    maxLength: PropTypes.number,
    maxWidthChars: PropTypes.number,
    overwriteMode: PropTypes.bool,
    placeholderText: PropTypes.string,
    populateAll: PropTypes.bool,
    primaryIconActivatable: PropTypes.bool,
    primaryIconGicon: PropTypes.object,
    primaryIconName: PropTypes.string,
    primaryIconPixbuf: PropTypes.object,
    primaryIconSensitive: PropTypes.bool,
    primaryIconStock: PropTypes.string,
    primaryIconStorageType: PropTypes.number,
    primaryIconTooltipMarkup: PropTypes.string,
    primaryIconTooltipText: PropTypes.string,
    progressFraction: PropTypes.number,
    progressPulseStep: PropTypes.number,
    scrollOffset: PropTypes.number,
    secondaryIconActivatable: PropTypes.bool,
    secondaryIconGicon: PropTypes.object,
    secondaryIconName: PropTypes.string,
    secondaryIconPixbuf: PropTypes.object,
    secondaryIconSensitive: PropTypes.bool,
    secondaryIconStock: PropTypes.string,
    secondaryIconStorageType: PropTypes.number,
    secondaryIconTooltipMarkup: PropTypes.string,
    secondaryIconTooltipText: PropTypes.string,
    selectionBound: PropTypes.number,
    shadowType: PropTypes.number,
    showEmojiIcon: PropTypes.bool,
    tabs: PropTypes.object,
    text: PropTypes.string,
    textLength: PropTypes.number,
    truncateMultiline: PropTypes.bool,
    visibility: PropTypes.bool,
    widthChars: PropTypes.number,
    xalign: PropTypes.number,
    editingCanceled: PropTypes.bool
  };

  static defaultProps = {
    activatesDefault: null,
    attributes: null,
    buffer: null,
    capsLockWarning: null,
    children: '',
    completion: null,
    cursorPosition: null,
    editable: null,
    enableEmojiCompletion: null,
    hasFrame: null,
    imModule: null,
    innerBorder: null,
    inputHints: null,
    inputPurpose: null,
    invisibleChar: null,
    invisibleCharSet: null,
    maxLength: null,
    maxWidthChars: null,
    overwriteMode: null,
    placeholderText: null,
    populateAll: null,
    primaryIconActivatable: null,
    primaryIconGicon: null,
    primaryIconName: null,
    primaryIconPixbuf: null,
    primaryIconSensitive: null,
    primaryIconStock: null,
    primaryIconStorageType: null,
    primaryIconTooltipMarkup: null,
    primaryIconTooltipText: null,
    progressFraction: null,
    progressPulseStep: null,
    scrollOffset: null,
    secondaryIconActivatable: null,
    secondaryIconGicon: null,
    secondaryIconName: null,
    secondaryIconPixbuf: null,
    secondaryIconSensitive: null,
    secondaryIconStock: null,
    secondaryIconStorageType: null,
    secondaryIconTooltipMarkup: null,
    secondaryIconTooltipText: null,
    selectionBound: null,
    shadowType: null,
    showEmojiIcon: null,
    tabs: null,
    text: null,
    textLength: null,
    truncateMultiline: null,
    visibility: null,
    widthChars: null,
    xalign: null,
    editingCanceled: null
  };

  constructor(props = {}) {
    super(new Gtk.Entry(), props, { mapChildren: 'text' });
  }

  unsetInvisibleChar(...props) {
    this.node.unsetInvisibleChar(...props);
  }

  layoutIndexToTextIndex(...props) {
    this.node.layoutIndexToTextIndex(...props);
  }

  textIndexToLayoutIndex(...props) {
    this.node.textIndexToLayoutIndex(...props);
  }

  progressPulse(...props) {
    this.node.progressPulse(...props);
  }

  imContextFilterKeypress(...props) {
    this.node.imContextFilterKeypress(...props);
  }

  resetImContext(...props) {
    this.node.resetImContext(...props);
  }

  grabFocusWithoutSelecting(...props) {
    this.node.grabFocusWithoutSelecting(...props);
  }
}
