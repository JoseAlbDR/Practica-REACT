import StyledConfirmModal from './styles/ConfirmModalWrapper';

interface ConfirmModalProps {
  resourceName: string;
  onConfirm: () => Promise<void>;
  disabled?: boolean;
  onCloseModal?: () => void;
  type: string;
}

const ConfirmModal = ({
  resourceName,
  onConfirm,
  disabled,
  onCloseModal,
  type,
}: ConfirmModalProps) => {
  return (
    <StyledConfirmModal>
      <h3>{type === 'delete' ? `Delete ${resourceName}` : type}</h3>
      <p>
        {type === 'delete'
          ? `Are you sure you want to delete this ${resourceName} permanently? This
        action cannot be undone.`
          : `Are you sure you want to ${type}`}
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
    </StyledConfirmModal>
  );
};

export default ConfirmModal;
