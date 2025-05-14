import { useCalendarCellContext } from '../../context/CalendarCellContext';

export const CustomDateCellWrapper = ({ value, children }: any) => {
  const { selectedDate } = useCalendarCellContext();

  const isSelected =
    selectedDate &&
    value &&
    value.toDateString() === selectedDate.toDateString();

  return (
    <div
      data-date={value?.toISOString()}
      style={{
        boxShadow: isSelected ? '0px 3px 6px #00000029' : undefined,
        border: isSelected ? '1px solid #EAF0F4' : undefined,
        transition: 'box-shadow 0.2s',
        height: '100%',
        width: '100%',
        position: 'relative',
        zIndex: isSelected ? 2 : 1,
      }}
    >
      {children}
    </div>
  );
};
