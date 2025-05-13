import moment from 'moment';

export const formatDate = (date: Date | string, format = 'YYYY-MM-DD') =>
  moment(date).format(format);

export const formatTime = (date: Date | string, format = 'HH:mm') =>
  moment(date).format(format);
