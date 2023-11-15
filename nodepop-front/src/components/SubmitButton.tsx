import { useNavigation } from 'react-router-dom';

const SubmitButton = ({ formBtn = false }: { formBtn?: boolean }) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  return (
    <button
      type="submit"
      className={`btn btn-block ${formBtn ? 'form-btn' : ''}`}
      disabled={isSubmitting}
    >
      {isSubmitting ? 'submitting...' : 'submit'}
    </button>
  );
};

export default SubmitButton;
