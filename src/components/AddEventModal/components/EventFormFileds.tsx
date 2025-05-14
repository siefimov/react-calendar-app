import DatePicker from 'react-datepicker';
import { FaRegCalendarAlt, FaRegClock } from 'react-icons/fa';
import { formatDate, formatTime } from '../../../utils/date';
import '../AddEventModal.scss';

export const EventFormFields = ({
  formData,
  setFormData,
  errors,
  editingEvent,
  isEditing,
  handleChange,
  selectedDate,
  selectedTime,
}: any) => (
  <>
    <label>
      event name
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        disabled={!!editingEvent && !isEditing}
      />
      {errors.title && (
        <span className="event-modal__error">{errors.title}</span>
      )}
    </label>
    <label>
      <div className="event-modal__block">
        <span className="event-modal__title">event date</span>
        <span className="event-modal__icon">
          <FaRegCalendarAlt />
        </span>
      </div>
      <DatePicker
        selected={selectedDate}
        onChange={date => {
          setFormData((prev: any) => ({
            ...prev,
            date: date ? formatDate(date) : '',
          }));
        }}
        dateFormat="yyyy-MM-dd"
        disabled={!!editingEvent && !isEditing}
        className="event-modal__datepicker"
      />
      {errors.date && <span className="event-modal__error">{errors.date}</span>}
    </label>
    <label>
      <div className="event-modal__block">
        <span>event time</span>
        <span className="event-modal__icon">
          <FaRegClock />
        </span>
      </div>
      <DatePicker
        selected={selectedTime}
        onChange={date => {
          setFormData((prev: any) => ({
            ...prev,
            time: date ? formatTime(date) : '',
          }));
        }}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={15}
        timeCaption="Time"
        dateFormat="hh:mm aa"
        timeFormat="hh:mm aa"
        disabled={!!editingEvent && !isEditing}
        className="event-modal__datepicker"
      />
      {errors.time && <span className="event-modal__error">{errors.time}</span>}
    </label>
    <label>
      Notes
      <textarea
        name="notes"
        value={formData.notes}
        onChange={handleChange}
        disabled={!!editingEvent && !isEditing}
      />
      {errors.notes && (
        <span className="event-modal__error">{errors.notes}</span>
      )}
    </label>
  </>
);
