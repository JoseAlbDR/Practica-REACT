import {
  ActionFunctionArgs,
  Form,
  redirect,
  useNavigate,
  useNavigation,
} from 'react-router-dom';
import { FormRow, SubmitButton } from '../../components';
import FormRowSelect from '../../components/form/FormRowSelect';
import { toast } from 'react-toastify';
import { getTags } from '../../components/form/service';
import FormRowTags from '../../components/form/FormRowTags';
import Wrapper from './styles/CreateAdvertWrapper';

import FormInput from '../../components/form/FormInput';
import { createAdvert } from './service';

export const loader = async () => {
  try {
    const tags = await getTags();
    return tags;
  } catch (error) {
    console.log(error);
    toast.error('Error Loading Tags');
  }
};

export const action = async (data: ActionFunctionArgs) => {
  const { request } = data;
  const formData = await request.formData();
  // const name = formData.get('name') as string;
  // const sale = (formData.get('sale') as string) === 'on sale' ? true : false;
  // const tags = formData.get('tags') as string[];

  try {
    await createAdvert(formData);
    toast.success('Advert Successfully Created');
    return redirect('/adverts');
  } catch (error) {
    console.log(error);
    toast.error('Error creating an Advertise, try again later');
    return error;
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
