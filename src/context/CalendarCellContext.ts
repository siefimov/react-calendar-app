import { createContext, useContext } from 'react';

export const CalendarCellContext = createContext<{ selectedDate: Date | null }>(
  { selectedDate: null },
);
export const useCalendarCellContext = () => useContext(CalendarCellContext);
export const CalendarCellProvider = CalendarCellContext.Provider;
