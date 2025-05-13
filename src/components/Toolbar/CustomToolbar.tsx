import React from 'react';
import { Navigate, type View } from 'react-big-calendar';
import './CustomToolbar.scss';

interface CustomToolbarProps {
  date: Date;
  label: string;
  onNavigate: (action: (typeof Navigate)[keyof typeof Navigate]) => void;
  onView: (view: View) => void;
  view: View;
}

export const CustomToolbar: React.FC<CustomToolbarProps> = ({
  date,
  label,
  onNavigate,
  onView,
  view,
}) => {
  const isToday = (input: Date) => {
    const today = new Date();

    return (
      input.getFullYear() === today.getFullYear() &&
      input.getMonth() === today.getMonth() &&
      input.getDate() === today.getDate()
    );
  };
  return (
    <div className="rbc-toolbar-custom">
      <div className="toolbar-row toolbar-row__top ">
        <span className="rbc-toolbar-title">Calendar View</span>
        <span className="rbc-btn-group">
          <button
            type="button"
            onClick={() => onView('month')}
            className={view === 'month' ? 'rbc-active' : ''}
          >
            Month
          </button>
          <button
            type="button"
            onClick={() => onView('week')}
            className={view === 'week' ? 'rbc-active' : ''}
          >
            Week
          </button>
          <button
            type="button"
            onClick={() => onView('day')}
            className={view === 'day' ? 'rbc-active' : ''}
          >
            Day
          </button>
          <button
            type="button"
            onClick={() => onView('agenda')}
            className={view === 'agenda' ? 'rbc-active' : ''}
          >
            Agenda
          </button>
        </span>
      </div>
      <div className="toolbar-row toolbar-row__bottom">
        <span className="rbc-btn-group">
          <button
            type="button"
            onClick={() => onNavigate(Navigate.TODAY)}
            className={isToday(date) ? 'today-active' : ''}
          >
            Today
          </button>
          <button type="button" onClick={() => onNavigate(Navigate.PREVIOUS)}>
            Back
          </button>
          <button type="button" onClick={() => onNavigate(Navigate.NEXT)}>
            Next
          </button>
        </span>
        <span className="rbc-toolbar-label">{label}</span>
      </div>
    </div>
  );
};
