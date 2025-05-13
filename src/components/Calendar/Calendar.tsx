import { useMemo, type FC } from 'react';
import {
  Calendar as BigCalendar,
  DateLocalizer,
  momentLocalizer,
  Views,
  type Event as CalendarEvent,
} from 'react-big-calendar';
import moment from 'moment';
import './Calendar.scss';
import { CustomToolbar } from '../Toolbar';
import { CustomWeekHeader } from '../CustomWeekHeader';
import { CustomTimeGutterHeader } from '../CustomTimeGutterHeader';
import { CustomDayHeader } from '../CustomDayHeader/CustomDayHeader';

const localizer = momentLocalizer(moment);

const events: CalendarEvent[] = [
  {
    title: 'Tech interview',
    start: new Date(2025, 4, 15, 10, 0),
    end: new Date(2025, 4, 15, 12, 0),
  },
  {
    title: 'Big Day presentation',
    start: new Date(2025, 4, 12, 9, 0),
    end: new Date(2025, 4, 12, 10, 0),
  },
];

export const Calendar: FC = () => {
  const { components, formats } = useMemo(
    () => ({
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
    }),
    [],
  );

  return (
    <BigCalendar
      defaultView={Views.MONTH}
      localizer={localizer}
      events={events}
      formats={formats}
      components={components}
      step={60}
      min={moment('1970-01-01T00:00:00').toDate()}
      max={moment('1970-01-01T23:00:00').toDate()}
    />
  );
};
