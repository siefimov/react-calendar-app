import React from 'react';
import moment from 'moment';
import './CustomWeekHeader.scss'; // Створіть файл стилів для хедеру

interface CustomHeaderProps {
  date: Date;
  label: string;
}

export const CustomWeekHeader: React.FC<CustomHeaderProps> = ({
  date,
  label,
}) => {
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
