import React, { useMemo } from 'react';
import {
  Calendar as BigCalendar,
  DateLocalizer,
  momentLocalizer,
  Views,
  type Event as CalendarEvent,
} from 'react-big-calendar';
import moment from 'moment';
import './Calendar.scss';
import { CustomToolbar } from '../Toolbar/CustomToolbar';

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

export const Calendar: React.FC = () => {
  const { components, formats } = useMemo(
    () => ({
      components: {
        toolbar: CustomToolbar,
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
    />
  );
};
