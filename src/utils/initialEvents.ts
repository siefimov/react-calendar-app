import type { CalendarEvent } from "../types";

export const initialEvents: CalendarEvent[] = [
  {
    id: '111',
    title: 'Tech interview',
    start: new Date(2025, 4, 15, 10, 0),
    end: new Date(2025, 4, 15, 12, 0),
    notes: 'some event',
  },
  {
    id: '222',
    title: 'Big Day presentation',
    start: new Date(2025, 4, 20, 9, 0),
    end: new Date(2025, 4, 20, 10, 0),
    notes: 'some event',
  },
];