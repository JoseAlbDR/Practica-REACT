import {
  FormRowInput,
  SubmitButton,
  FormRowTags,
  FormRowFileInput,
  FormRowSelect,
  Spinner,
} from '../../components/shared';
import Wrapper from './styles/CreateAdvertWrapper';

import { ITags } from '../../interfaces/tags.interface';

import { FormEvent, ReactNode, useEffect } from 'react';
import { getTags, getUi } from '../../store/selectors';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../main';
import { createAdvert, loadTags } from '../../store/actions';

interface CreateAdvertProps {
  title?: string;
  data?:
    | { name: string; sale: string; price: number; tags: ITags[] }
    | undefined;
  cancelButton?: ReactNode | undefined;
}

const CreateAdvert = ({
  title = 'Create Advert',
  cancelButton = undefined,
}: CreateAdvertProps) => {
  const dispatch = useAppDispatch();
  const { isFetching } = useSelector(getUi);
  const tags = useSelector(getTags);

  useEffect(() => {
    if (tags.length > 0) return;

    dispatch(loadTags());
  }, [tags, dispatch]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    dispatch(createAdvert(formData));
  };

  return (
    <Wrapper>
      {isFetching ? (
        <Spinner />
      ) : (
        <form
          onSubmit={handleSubmit}
          className="form"
          encType="multipart/form-data"
        >
          <h4>{title}</h4>
          <FormRowInput
            type="text"
            name="name"
            labelText="name"
            disabled={isFetching}
          />
          <FormRowSelect
            name="sale"
            types={['on sale', 'search']}
            disabled={isFetching}
          />
          <FormRowTags tags={tags} disabled={isFetching} />
          <FormRowInput
            type="number"
            name="price"
            labelText="price"
            disabled={isFetching}
          />
          <FormRowFileInput
            labelText="select an image file (max 0.5MB)"
            type="file"
            id="image"
            name="photo"
          />
          <SubmitButton formBtn />
          {cancelButton}
        </form>
      )}
    </Wrapper>
  );
};

export default CreateAdvert;
