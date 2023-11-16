import {
  Form,
  useNavigate,
  useNavigation,
  useOutletContext,
} from 'react-router-dom';
import { FormRow, SubmitButton } from '../../components';
import FormRowSelect from '../../components/form/FormRowSelect';
import { toast } from 'react-toastify';
import { getTags } from '../../components/form/service';
import FormRowTags from '../../components/form/FormRowTags';
import Wrapper from './styles/CreateAdvertWrapper';
import { useEffect } from 'react';
import { IUser } from '../../interfaces/auth.interfaces';
import FormInput from '../../components/form/FormInput';

export const loader = async () => {
  try {
    const tags = await getTags();
    return tags;
  } catch (error) {
    console.log(error);
    toast.error('Error Loading Tags');
  }
};

const CreateAdvert = () => {
  const navigation = useNavigation();
  const navigate = useNavigate();
  const user = useOutletContext() as IUser;
  const isSubmitting = navigation.state === 'submitting';

  useEffect(() => {
    if (!user) {
      toast.error('Unauthenticated, please login first.');
      navigate('login');
    }
  }, [user, navigate]);

  return (
    <Wrapper>
      <Form className="form">
        <h4>New Advert</h4>
        <FormRow
          type="text"
          name="name"
          labelText="name"
          defaultValue=""
          disabled={isSubmitting}
        />
        <FormRowSelect name="onSale" types={['on sale', 'search']} />
        <FormRowTags />
        <FormRow
          type="number"
          name="price"
          labelText="price"
          defaultValue="0"
          disabled={isSubmitting}
        />
        <FormInput
          labelText="select an image file (max 0.5MB)"
          type="file"
          id="image"
          name="image"
        />
        <SubmitButton formBtn />
      </Form>
    </Wrapper>
  );
};

export default CreateAdvert;
