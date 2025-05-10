import React from 'react';
import {
  Calendar as BigCalendar,
  momentLocalizer,
  Views,
  type Event as CalendarEvent,
} from 'react-big-calendar';
import moment from 'moment';

const localizer = momentLocalizer(moment);

const events: CalendarEvent[] = [
  {
    title: 'Подія 1',
    start: new Date(2025, 4, 10, 10, 0),
    end: new Date(2025, 4, 10, 12, 0),
  },
  {
    title: 'Подія 2',
    start: new Date(2025, 4, 11, 9, 0),
    end: new Date(2025, 4, 11, 10, 0),
  },
];

export const Calendar: React.FC = () => {
  return (
    <BigCalendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      defaultView={Views.MONTH}
      defaultDate={new Date(2025, 4, 10)}
      style={{ height: '100%' }}
    />
  );
};


