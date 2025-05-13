import { useState, type FC } from 'react';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import { type EventData, type EventModalProps } from '../../types';
import './AddEventModal.scss';
import 'react-datepicker/dist/react-datepicker.css';
import { formatDate, formatTime } from '../../utils/date';

export const AddEventModal: FC<EventModalProps> = ({
  top,
  left,
  onClose,
  onSave,
  formData,
  setFormData,
  isEditing,
  editingEvent,
  onDelete,
  setIsEditing,
}) => {
  const [errors, setErrors] = useState<
    Partial<Record<keyof EventData, string>>
  >({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof EventData, string>> = {};
    const now = new Date();
    const eventDate = new Date(`${formData.date}T${formData.time}`);

    if (!formData.title.trim()) {
      newErrors.title = 'Event name is required';
    }
    if (!formData.date) {
      newErrors.date = 'Date is required';
    } else if (eventDate < now) {
      newErrors.date = 'Date and time must be in the future';
    }
    if (!formData.time) {
      newErrors.time = 'Time is required';
    }
    if (!formData.notes.trim()) {
      newErrors.notes = 'Notes are required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onSave(formData);
      setIsEditing(false);
    }
  };

  const handleEdit = () => setIsEditing(true);

  const selectedDate = formData.date
    ? moment(formData.date, 'YYYY-MM-DD').toDate()
    : null;

  const selectedTime =
    formData.time && formData.date
      ? moment(
          `${formData.date}T${formData.time}`,
          'YYYY-MM-DDTHH:mm',
        ).isValid()
        ? moment(
            `${formData.date}T${formData.time}`,
            'YYYY-MM-DDTHH:mm',
          ).toDate()
        : null
      : null;

  return (
    <div className="event-modal" style={{ top, left }}>
      <button className="event-modal__close" onClick={onClose}>
        ×
      </button>
      <div className="event-modal__body">
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
              setFormData(prev => ({
                ...prev,
                date: date ? formatDate(date) : '',
              }));
            }}
            dateFormat="yyyy-MM-dd"
            disabled={!!editingEvent && !isEditing}
            className="event-modal__datepicker"
          />
          {errors.date && (
            <span className="event-modal__error">{errors.date}</span>
          )}
        </label>
        <label>
          Event Time
          <DatePicker
            selected={selectedTime}
            onChange={date => {
              setFormData(prev => ({
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
          {errors.time && (
            <span className="event-modal__error">{errors.time}</span>
          )}
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
      </div>
      <div className="event-modal__actions">
        {editingEvent ? (
          <>
            <button onClick={onDelete} className="event-modal__discard">
              Discard
            </button>
            {!isEditing ? (
              <button onClick={handleEdit} className="event-modal__edit">
                Edit
              </button>
            ) : (
              <button onClick={handleSubmit} className="event-modal__save">
                Save
              </button>
            )}
          </>
        ) : (
          <>
            <button onClick={onClose} className="event-modal__cancel">
              Cancel
            </button>
            <button onClick={handleSubmit} className="event-modal__save">
              Save
            </button>
          </>
        )}
      </div>
    </div>
  );
};
