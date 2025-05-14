import React from 'react';
import moment from 'moment';
import './CustomWeekHeader.scss';

interface CustomHeaderProps {
  date: Date;
  label: string;
}

export const CustomWeekHeader: React.FC<CustomHeaderProps> = ({ date }) => {
  return (
    <div className="custom-week-header">
      <span className="custom-week-header__day">
        {moment(date).format('ddd')}&nbsp;
      </span>
      <span className="custom-week-header__date">
        {moment(date).format('DD/MM')}
      </span>
    </div>
  );
};
