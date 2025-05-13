import { type FC } from 'react';
import moment from 'moment';

interface CustomHeaderProps {
  date: Date;
}

export const CustomDayHeader: FC<CustomHeaderProps> = ({ date }) => {
  console.log('custom day header render');

  return (
    <div
      className="custom-day-header"
      style={{ background: 'red', color: 'white', padding: '8px' }}
    >
      <span className="custom-day-header__day">
        {moment(date).format('ddd')}&nbsp;
      </span>
      <span className="custom-day-header__date">
        {moment(date).format('DD/MM')}
      </span>
    </div>
  );
};
