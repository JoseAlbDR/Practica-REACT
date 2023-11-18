import StyledConfirmDelete from './styles/ConfirmDeleteWrapper';

interface ConfirmDeleteProps {
  resourceName: string;
  onConfirm: () => Promise<void>;
  disabled?: boolean;
  onCloseModal?: () => void;
}

function ConfirmDelete({
  resourceName,
  onConfirm,
  disabled,
  onCloseModal,
}: ConfirmDeleteProps) {
  return (
    <StyledConfirmDelete>
      <h3>Delete {resourceName}</h3>
      <p>
        Are you sure you want to delete this {resourceName} permanently? This
        action cannot be undone.
      </p>

      <div>
        <button
          className="btn btn-hipster"
          disabled={disabled}
          onClick={onCloseModal}
        >
          Cancel
        </button>
        <button
          className="btn danger-btn"
          disabled={disabled}
          onClick={onConfirm}
        >
          Delete
        </button>
      </div>
    </StyledConfirmDelete>
  );
}

export default ConfirmDelete;
