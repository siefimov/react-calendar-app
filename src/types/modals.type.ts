import type { EventData, CalendarEvent } from './calendar.type';

export interface EventModalProps {
  top: number;
  left: number;
  onClose: () => void;
  onSave: (eventData: EventData) => void;
  formData: EventData;
  setFormData: React.Dispatch<React.SetStateAction<EventData>>;
  isEditing?: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  onDelete: () => void;
  editingEvent: CalendarEvent | null;
}
