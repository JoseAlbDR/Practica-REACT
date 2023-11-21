import { useNavigation } from 'react-router-dom';

export const useCustomNavigation = () => {
  const navigation = useNavigation();

  const isSubmitting = navigation.state === 'submitting';
  const isLoading = navigation.state === 'loading';

  return { isSubmitting, isLoading };
};
