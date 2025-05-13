import { useMemo, useRef, useState, type FC } from 'react';
import {
  Calendar as BigCalendar,
  DateLocalizer,
  momentLocalizer,
  Views,
  type Event as CalendarEvent,
  type SlotInfo,
} from 'react-big-calendar';
import moment from 'moment';
import './Calendar.scss';
import { CustomToolbar } from '../Toolbar';
import { CustomWeekHeader } from '../CustomWeekHeader';
import { CustomTimeGutterHeader } from '../CustomTimeGutterHeader';
import { CustomDayHeader } from '../CustomDayHeader/CustomDayHeader';
import { AddEventModal, type EventData } from '../AddEventModal/AddEventModal';

const localizer = momentLocalizer(moment);

const initialEvents: CalendarEvent[] = [
  {
    title: 'Tech interview',
    start: new Date(2025, 4, 15, 10, 0),
    end: new Date(2025, 4, 15, 12, 0),
  },
  {
    title: 'Big Day presentation',
    start: new Date(2025, 4, 20, 9, 0),
    end: new Date(2025, 4, 20, 10, 0),
  },
];

export const Calendar: FC = () => {
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);
  const [showModal, setShowModal] = useState(true);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const [formData, setFormData] = useState<EventData>({
    title: '',
    date: '',
    time: '',
    notes: '',
  });

  const calendarRef = useRef<HTMLDivElement>(null);

  const handleSelectSlot = (slotInfo: SlotInfo) => {
    const calendarBounds = calendarRef.current?.getBoundingClientRect();
    const top = slotInfo.box?.y ?? 0;
    const left = slotInfo.box?.x ?? 0;

    setModalPosition({
      top: top - (calendarBounds?.top || 0) - 40,
      left: left - (calendarBounds?.left || 0) - 112,
    });

    setFormData({
      title: '',
      date: '',
      time: '',      
      notes: '',
    });

    setShowModal(true);
  };

  const handleSave = (newEvent: EventData) => {
    const start = new Date(`${newEvent.date}T${newEvent.time}`);
    const end = moment(start).add(1, 'hour').toDate();

    setEvents(prev => [
      ...prev,
      {
        title: newEvent.title,
        start,
        end,
        allDay: false,
      },
    ]);
    setShowModal(false);
  };

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
    <div ref={calendarRef} style={{ position: 'relative', height: '90vh' }}>
      <BigCalendar
        defaultView={Views.MONTH}
        localizer={localizer}
        events={events}
        formats={formats}
        components={components}
        step={60}
        min={moment('1970-01-01T00:00:00').toDate()}
        max={moment('1970-01-01T23:00:00').toDate()}
        selectable
        onSelectSlot={handleSelectSlot}
      />

      {showModal && (
        <AddEventModal
          top={modalPosition.top}
          left={modalPosition.left}
          onClose={() => setShowModal(false)}
          onSave={handleSave}
          formData={formData}
          setFormData={setFormData}
        />
      )}
    </div>
  );
};
