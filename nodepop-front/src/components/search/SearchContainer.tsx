/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, Form, useNavigation, useSubmit } from 'react-router-dom';
import { FormRow, FormRowSelect } from '..';

import StyledSearchContainer from './styles/StyledSearchContainer';
import FormSearchPrices from '../form/FormSearchPrices';

import { changePriceUrl } from '../../utils/changePriceUrl';
import { useAdverts } from '../../context/AdvertsContext';
import { useTags } from '../../context/TagsContext';

const SearchContainer = () => {
  const { min, max, params } = useAdverts();
  const { tags } = useTags();

  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  const submit = useSubmit();

  const debounce = (onChange: (e: any) => void) => {
    let timeout: NodeJS.Timeout | undefined;
    return (e: { currentTarget: { form: unknown } }) => {
      const form = e.currentTarget.form;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        onChange(form);
      }, 1000);
    };
  };

  return (
    <StyledSearchContainer>
      <div className="dashboard-page">
        <Form id="search-form">
          <h4>Search</h4>
          <div className="form-center">
            <FormRow
              onChange={debounce((form) => {
                if (form) changePriceUrl(form as HTMLFormElement);
                submit(form);
              })}
              type="search"
              name="name"
              labelText="name"
              defaultValue={params.name}
              disabled={isSubmitting}
            />
            <FormSearchPrices onChange={submit} defaultValue={[min, max]} />
            <FormRowSelect
              name="type"
              types={['all', 'On sale', 'Search']}
              selected={params.type}
              onChange={submit}
            />
            <FormRowSelect
              name="tags"
              types={['all', ...tags]}
              selected={params.tags}
              onChange={submit}
            />
            <Link className="btn btn-block form-btn" to={`/adverts`}>
              Reset Search Values
            </Link>
          </div>
        </Form>
      </div>
    </StyledSearchContainer>
  );
};

export default SearchContainer;
