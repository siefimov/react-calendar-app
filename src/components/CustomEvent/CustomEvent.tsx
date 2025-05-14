import { type FC } from "react";
import { type CalendarEvent } from "../../types";

interface CustomEventProps {
  event: CalendarEvent;
  [key: string]: any;
}

export const CustomEvent: FC<CustomEventProps> = ({
  event,
  className,
  style,
  onClick,
}) => (
  <div
    data-event-id={event.id}
    className={className}
    style={style}
    onClick={onClick}
  >
    {event.title}
  </div>
);
