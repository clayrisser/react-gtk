import PropTypes from 'prop-types';
import Gtk from '../gtk';
import Element from './Element';

export default class Calendar extends Element {
  static propTypes = {
    day: PropTypes.number,
    detailHeightRows: PropTypes.number,
    detailWidthChars: PropTypes.number,
    month: PropTypes.number,
    noMonthChange: PropTypes.bool,
    showDayNames: PropTypes.bool,
    showDetails: PropTypes.bool,
    showHeading: PropTypes.bool,
    showWeekNumbers: PropTypes.bool,
    year: PropTypes.number
  };

  static defaultProps = {
    day: null,
    detailHeightRows: null,
    detailWidthChars: null,
    month: null,
    noMonthChange: null,
    showDayNames: null,
    showDetails: null,
    showHeading: null,
    showWeekNumbers: null,
    year: null
  };

  constructor(props: object = {}) {
    super(new Gtk.Calendar(), props);
  }

  clearMarks(): null {
    return this.node.clearMarks();
  }

  markDay(day: number): null {
    return this.node.markDay(day);
  }

  selectDay(day: number): null {
    return this.node.selectDay(day);
  }

  selectMonth(month: number, year: number): null {
    return this.node.selectMonth(month, year);
  }

  unmarkDay(day: number): null {
    return this.node.unmarkDay(day);
  }
}
