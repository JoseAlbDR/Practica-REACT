/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Link,
  Form,
  useNavigation,
  useSubmit,
  useLoaderData,
} from 'react-router-dom';
import { FormRow, FormRowSelect } from '..';

import StyledSearchContainer from './styles/StyledSearchContainer';
import FormSearchPrices from '../form/FormSearchPrices';
import { AdvertLoaderData } from '../../interfaces/advert.interface';
import { getMinMaxPrice } from '../../utils/getMinMaxPrice';
import { changePriceUrl } from '../../utils/changePriceUrl';

const SearchContainer = () => {
  const { adverts, tags } = useLoaderData() as AdvertLoaderData;
  const { min, max } = getMinMaxPrice(adverts);

  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  const submit = useSubmit();

  const debounce = (onChange: (e: any) => void) => {
    let timeout: NodeJS.Timeout | undefined;
    return (e: { currentTarget: { form: any } }) => {
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
              defaultValue=""
              disabled={isSubmitting}
            />
            <FormSearchPrices onChange={submit} defaultValue={[min, max]} />
            <FormRowSelect
              name="onSale"
              types={['all', 'On sale', 'Search']}
              // selected={onSale}
              onChange={submit}
            />
            <FormRowSelect
              name="tags"
              types={['all', ...tags]}
              // selected={searchTags}
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
