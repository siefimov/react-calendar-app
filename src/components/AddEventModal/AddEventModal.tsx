import { useState, type FC } from 'react';
import './AddEventModal.scss';

interface EventModalProps {
  top: number;
  left: number;
  onClose: () => void;
  onSave: (eventData: EventData) => void;
  formData: EventData;
  setFormData: React.Dispatch<React.SetStateAction<EventData>>;
}

export interface EventData {
  title: string;
  date: string;
  time: string;
  notes: string;
}

export const AddEventModal: FC<EventModalProps> = ({
  top,
  left,
  onClose,
  onSave,
  formData,
  setFormData,
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
    }
  };

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
          />
          {errors.title && (
            <span className="event-modal__error">{errors.title}</span>
          )}
        </label>
        <label>
          Event Date
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            placeholder=""
          />
          {errors.date && (
            <span className="event-modal__error">{errors.date}</span>
          )}
        </label>
        <label>
          Event Time
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
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
          />
          {errors.notes && (
            <span className="event-modal__error">{errors.notes}</span>
          )}
        </label>
      </div>
      <div className="event-modal__actions">
        <button onClick={onClose}>Cancel</button>
        <button onClick={handleSubmit}>Save</button>
      </div>
    </div>
  );
};
