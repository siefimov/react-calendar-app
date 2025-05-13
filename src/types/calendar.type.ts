export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  notes?: string;
};

export interface EventData {
  title: string;
  date: string;
  time: string;
  notes: string;
}
