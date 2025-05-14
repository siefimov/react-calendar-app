import { DateLocalizer } from 'react-big-calendar';
import {
  CustomToolbar,
  CustomWeekHeader,
  CustomDayHeader,
  CustomTimeGutterHeader,
} from '../components';

export function getCalendarConfig() {
  return {
    components: {
      toolbar: CustomToolbar,
      timeGutterHeader: CustomTimeGutterHeader,
      week: {
        header: CustomWeekHeader,
      },
      day: {
        header: CustomDayHeader,
      },
    },
    formats: {
      dayHeaderFormat: (
        date: Date,
        culture?: string,
        localizer?: DateLocalizer,
      ) => (localizer ? localizer.format(date, 'dddd MMM D', culture) : ''),
      dayRangeHeaderFormat: (
        { start, end }: { start: Date; end: Date },
        culture?: string,
        localizer?: DateLocalizer,
      ) =>
        localizer
          ? localizer.format(start, 'MMM D', culture) +
            ' - ' +
            localizer.format(end, 'MMM D', culture)
          : '',
      dateFormat: (date: Date, culture?: string, localizer?: DateLocalizer) =>
        localizer ? localizer.format(date, 'D', culture) : '',
    },
  };
}
