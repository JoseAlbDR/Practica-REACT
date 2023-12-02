import { Spinner } from '.';
import StyledConfirmModal from './styles/ConfirmModalWrapper';

interface ConfirmModalProps {
  resourceName: string;
  onConfirm: () => Promise<void>;
  disabled?: boolean;
  onCloseModal?: () => void;
  type: string;
  isLoading?: boolean;
}

const ConfirmModal = ({
  resourceName,
  onConfirm,
  disabled,
  onCloseModal,
  type,
  isLoading,
}: ConfirmModalProps) => {
  if (isLoading) return <Spinner />;

  return (
    <StyledConfirmModal>
      <>
        <h3>{type === 'delete' ? `Delete ${resourceName}` : type}</h3>
        <p>
          {type === 'delete'
            ? `Are you sure you want to delete this ${resourceName} permanently? This
        action cannot be undone.`
            : `Are you sure do you want to ${type}?`}
        </p>

        <div>
          <button
            className="btn btn-block btn-hipster"
            disabled={disabled}
            onClick={onCloseModal}
          >
            Cancel
          </button>
          <button
            className="btn btn-block danger-btn"
            disabled={disabled}
            onClick={onConfirm}
          >
            {type}
          </button>
        </div>
      </>
    </StyledConfirmModal>
  );
};

export default ConfirmModal;
