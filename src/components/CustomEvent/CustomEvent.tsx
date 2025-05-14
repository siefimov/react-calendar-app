import { type FC } from 'react';
import { type CalendarEvent } from '../../types';

interface CustomEventProps {
  event: CalendarEvent;
  [key: string]: any;
}

export const CustomEvent: FC<CustomEventProps> = ({ event, ...props }) => {
  return (
    <div data-event-id={event.id} {...props}>
      {event.title}
    </div>
  );
};
