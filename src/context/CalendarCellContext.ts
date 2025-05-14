import { createContext, useContext } from 'react';

export const CalendarCellContext = createContext<{
  selectedDate: Date | null;
  selectedEventId: string | null;
}>({
  selectedDate: null,
  selectedEventId: null,
});
export const useCalendarCellContext = () => useContext(CalendarCellContext);
export const CalendarCellProvider = CalendarCellContext.Provider;
