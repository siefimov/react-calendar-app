import { useState, type FC } from 'react';
import moment from 'moment';
import { type EventData, type EventModalProps } from '../../types';
import './AddEventModal.scss';
import 'react-datepicker/dist/react-datepicker.css';
import { EventFormFields } from './components/EventFormFileds';
import { EventModalActions } from './components/EventModalActions';

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
        <EventFormFields
          formData={formData}
          setFormData={setFormData}
          errors={errors}
          editingEvent={editingEvent}
          isEditing={isEditing}
          handleChange={handleChange}
          selectedDate={selectedDate}
          selectedTime={selectedTime}
        />
      </div>
      <EventModalActions
        editingEvent={editingEvent}
        isEditing={isEditing}
        onDelete={onDelete}
        handleEdit={handleEdit}
        handleSubmit={handleSubmit}
        onClose={onClose}
      />
    </div>
  );
};
