import {
  ActionFunctionArgs,
  Form,
  redirect,
  useActionData,
} from 'react-router-dom';
import { toast } from 'react-toastify';

import {
  FormRowInput,
  SubmitButton,
  FormRowTags,
  FormRowFileInput,
  FormRowSelect,
  Spinner,
} from '../../components/shared';
import Wrapper from './styles/CreateAdvertWrapper';

import { createAdvert } from './service';
import { ITags } from '../../interfaces/tags.interface';
import { useCustomNavigation } from '../../hooks/useCustomNavigation';
import { CustomAxiosError } from '../../api/customFetch';
import { AxiosError } from 'axios';

export const action = async (data: ActionFunctionArgs) => {
  const { request } = data;
  const formData = await request.formData();
  const tags = formData.getAll('tags');

  if (tags.length === 0) {
    console.log('asdf');
    toast.error('Select at least one tag!');
    console.log(formData);
    return formData;
  }

  try {
    await createAdvert(formData);
    toast.success('Advert Successfully Created');
    return redirect('/adverts');
  } catch (error) {
    console.log(error);
    if (error instanceof CustomAxiosError || error instanceof AxiosError) {
      toast.error('Error creating Advert, try again later');
      return null;
    }
    toast.error('There was an error, try again later');
    return null;
  }
};

const CreateAdvert = () => {
  const { isSubmitting, isLoading } = useCustomNavigation();

  const formData = useActionData() as FormData;

  const name = formData?.get('name') as string;
  const sale = formData?.get('sale') as string;
  const price = formData?.get('price') as string;
  const tags = formData?.getAll('tags') as ITags[];

  console.log(name, sale, price);

  return (
    <Wrapper>
      {isLoading ? (
        <Spinner />
      ) : (
        <Form method="post" className="form" encType="multipart/form-data">
          <h4>New Advert</h4>
          <FormRowInput
            type="text"
            name="name"
            labelText="name"
            defaultValue={name || ''}
            disabled={isSubmitting}
          />
          <FormRowSelect
            name="sale"
            types={['on sale', 'search']}
            selected={sale || ''}
            disabled={isSubmitting}
          />
          <FormRowTags tags={tags} disabled={isSubmitting} />
          <FormRowInput
            type="number"
            name="price"
            labelText="price"
            defaultValue={price || '0'}
            disabled={isSubmitting}
          />
          <FormRowFileInput
            labelText="select an image file (max 0.5MB)"
            type="file"
            id="image"
            name="photo"
          />
          <SubmitButton formBtn />
        </Form>
      )}
    </Wrapper>
  );
};

export default CreateAdvert;
