import DatePicker from 'react-datepicker';
import { formatDate, formatTime } from '../../../utils/date';

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
      Event Name
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
      Event Date
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
      Event Time
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
