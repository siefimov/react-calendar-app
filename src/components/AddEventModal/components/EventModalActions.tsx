export const EventModalActions = ({
  editingEvent,
  isEditing,
  onDelete,
  handleEdit,
  handleSubmit,
  onClose,
}: any) => (
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
);
