import PropTypes from 'prop-types';
import Gtk from '../gtk';
import Element from './Element';

export default class SpinButton extends Element {
  static propTypes = {
    adjustment: PropTypes.object,
    climbRate: PropTypes.number,
    digits: PropTypes.number,
    numeric: PropTypes.bool,
    snapToTicks: PropTypes.bool,
    updatePolicy: PropTypes.object,
    value: PropTypes.number,
    wrap: PropTypes.bool,
    activatesDefault: PropTypes.bool,
    attributes: PropTypes.object,
    buffer: PropTypes.object,
    capsLockWarning: PropTypes.bool,
    completion: PropTypes.object,
    cursorPosition: PropTypes.number,
    editable: PropTypes.bool,
    enableEmojiCompletion: PropTypes.bool,
    hasFrame: PropTypes.bool,
    imModule: PropTypes.string,
    innerBorder: PropTypes.object,
    inputHints: PropTypes.object,
    inputPurpose: PropTypes.object,
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
    primaryIconStorageType: PropTypes.object,
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
    secondaryIconStorageType: PropTypes.object,
    secondaryIconTooltipMarkup: PropTypes.string,
    secondaryIconTooltipText: PropTypes.string,
    selectionBound: PropTypes.number,
    shadowType: PropTypes.object,
    showEmojiIcon: PropTypes.bool,
    tabs: PropTypes.object,
    text: PropTypes.string,
    textLength: PropTypes.number,
    truncateMultiline: PropTypes.bool,
    visibility: PropTypes.bool,
    widthChars: PropTypes.number,
    xalign: PropTypes.number
  };

  static defaultProps = {
    adjustment: null,
    climbRate: null,
    digits: null,
    numeric: null,
    snapToTicks: null,
    updatePolicy: null,
    value: null,
    wrap: null,
    activatesDefault: null,
    attributes: null,
    buffer: null,
    capsLockWarning: null,
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
    xalign: null
  };

  constructor(props: object = {}) {
    super(new Gtk.SpinButton(), props);
  }

  configure(adjustment: object, climbRate: number, digits: number): null {
    return this.node.configure(adjustment, climbRate, digits);
  }

  spin(direction: object, increment: number): null {
    return this.node.spin(direction, increment);
  }

  update(): null {
    return this.node.update();
  }

  grabFocusWithoutSelecting(): null {
    return this.node.grabFocusWithoutSelecting();
  }

  imContextFilterKeypress(event: object): boolean {
    return this.node.imContextFilterKeypress(event);
  }

  layoutIndexToTextIndex(layoutIndex: number): number {
    return this.node.layoutIndexToTextIndex(layoutIndex);
  }

  progressPulse(): null {
    return this.node.progressPulse();
  }

  resetImContext(): null {
    return this.node.resetImContext();
  }

  textIndexToLayoutIndex(textIndex: number): number {
    return this.node.textIndexToLayoutIndex(textIndex);
  }

  unsetInvisibleChar(): null {
    return this.node.unsetInvisibleChar();
  }
}
