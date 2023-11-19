import {
  ActionFunctionArgs,
  Form,
  redirect,
  useNavigation,
} from 'react-router-dom';
import { toast } from 'react-toastify';

import {
  FormRow,
  SubmitButton,
  FormRowTags,
  FormInput,
  FormRowSelect,
} from '../../components';

import Wrapper from './styles/CreateAdvertWrapper';

import { createAdvert } from './service';

export const action = async (data: ActionFunctionArgs) => {
  const { request } = data;
  const formData = await request.formData();

  try {
    await createAdvert(formData);
    toast.success('Advert Successfully Created');
    return redirect('/adverts');
  } catch (error) {
    console.log(error);
    toast.error('Error creating an Advertise, try again later');
    throw new Error('Error creating an Advertise');
  }
};

const CreateAdvert = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <Wrapper>
      <Form method="post" className="form" encType="multipart/form-data">
        <h4>New Advert</h4>
        <FormRow
          type="text"
          name="name"
          labelText="name"
          defaultValue=""
          disabled={isSubmitting}
        />
        <FormRowSelect name="sale" types={['on sale', 'search']} />
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
          name="photo"
        />
        <SubmitButton formBtn />
      </Form>
    </Wrapper>
  );
};

export default CreateAdvert;
