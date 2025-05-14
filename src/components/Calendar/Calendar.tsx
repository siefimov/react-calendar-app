import { useMemo, useRef, useState, type FC } from 'react';
import {
  Calendar as BigCalendar,
  momentLocalizer,
  Views,
  type SlotInfo,
} from 'react-big-calendar';
import moment from 'moment';
import './Calendar.scss';
import { AddEventModal } from '../AddEventModal/AddEventModal';
import { type CalendarEvent, type EventData } from '../../types';
import { formatDate, formatTime, initialEvents } from '../../utils';
import withDragAndDrop, {
  type EventInteractionArgs,
} from 'react-big-calendar/lib/addons/dragAndDrop';
import { getCalendarConfig } from '../../utils/getCalendarConfig';
import { CalendarCellProvider } from '../../context/CalendarCellContext';

const localizer = momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop<CalendarEvent>(BigCalendar);

export const Calendar: FC = () => {
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);
  const [showModal, setShowModal] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const [formData, setFormData] = useState<EventData>({
    title: '',
    date: '',
    time: '',
    notes: '',
  });
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const calendarRef = useRef<HTMLDivElement>(null);

  const handleSelectSlot = (slotInfo: SlotInfo) => {
    setSelectedDate(slotInfo.start);

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

    if (editingEvent) {
      setEvents(prev =>
        prev.map(e =>
          e.id === editingEvent.id
            ? { ...e, title: newEvent.title, start, end, notes: newEvent.notes }
            : e,
        ),
      );
    } else {
      setEvents(prev => [
        ...prev,
        {
          id: crypto.randomUUID(),
          title: newEvent.title,
          start,
          end,
          allDay: false,
          notes: newEvent.notes,
        },
      ]);
    }
    setShowModal(false);
    setEditingEvent(null);
    setSelectedDate(null);
  };

  const handleSelectEvent = (
    event: object,
    _e: React.SyntheticEvent<HTMLElement, Event>,
  ) => {
    const calendarEvent = event as CalendarEvent;
    setEditingEvent(calendarEvent);
    setFormData({
      title: calendarEvent.title,
      date: formatDate(calendarEvent.start),
      time: formatTime(calendarEvent.start),
      notes: calendarEvent.notes || '',
    });
    setIsEditing(false);
    setShowModal(true);
  };

  const handleDeleteEvent = () => {
    setEvents(events.filter(e => e.id !== editingEvent?.id));
    setShowModal(false);
    setEditingEvent(null);
  };

  const handleEventDrop = (args: EventInteractionArgs<CalendarEvent>) => {
    const { event, start, end } = args;
    setEvents(prev =>
      prev.map(e =>
        e.id === event.id
          ? {
              ...e,
              start: start instanceof Date ? start : new Date(start),
              end: end instanceof Date ? end : new Date(end),
            }
          : e,
      ),
    );
  };

  const handleEventResize = (args: EventInteractionArgs<CalendarEvent>) => {
    const { event, start, end } = args;
    setEvents(prev =>
      prev.map(e =>
        e.id === event.id
          ? {
              ...e,
              start: start instanceof Date ? start : new Date(start),
              end: end instanceof Date ? end : new Date(end),
            }
          : e,
      ),
    );
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingEvent(null);
    setSelectedDate(null);
  };

  const { components, formats } = useMemo(getCalendarConfig, [selectedDate]);

  return (
    <CalendarCellProvider value={{ selectedDate }}>
      <div
        ref={calendarRef}
        style={{
          position: 'relative',
          height: '100vh',
          padding: '20px',
        }}
      >
        <DragAndDropCalendar
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
          onSelectEvent={handleSelectEvent}
          onEventDrop={handleEventDrop}
          onEventResize={handleEventResize}
          resizable
        />
        {showModal && (
          <AddEventModal
            top={modalPosition.top}
            left={modalPosition.left}
            onClose={handleCloseModal}
            onSave={handleSave}
            formData={formData}
            setFormData={setFormData}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            editingEvent={editingEvent}
            onDelete={handleDeleteEvent}
          />
        )}
      </div>
    </CalendarCellProvider>
  );
};
