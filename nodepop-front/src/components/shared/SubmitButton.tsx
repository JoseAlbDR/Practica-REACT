import { useSelector } from 'react-redux';
import { getUi } from '../../store/selectors';

const SubmitButton = ({ formBtn = false }: { formBtn?: boolean }) => {
  const { isFetching } = useSelector(getUi);

  return (
    <button
      type="submit"
      className={`btn btn-block ${formBtn ? 'form-btn' : ''}`}
      disabled={isFetching}
    >
      {isFetching ? 'submitting...' : 'submit'}
    </button>
  );
};

export default SubmitButton;
