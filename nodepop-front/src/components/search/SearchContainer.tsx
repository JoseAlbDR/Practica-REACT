/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useSearchParams } from 'react-router-dom';

import StyledSearchContainer from './styles/StyledSearchContainer';

import {
  FormSearchPrices,
  FormRowSelect,
  FormRowInput,
  FormRowTags,
  SubmitButton,
} from '../shared/';

import { useSelector } from 'react-redux';
import {
  getAdverts,
  getMinMaxPrice,
  getTags,
  getUi,
} from '../../store/selectors';
import { FormEvent, useEffect, useState } from 'react';
import { useAppDispatch } from '../../main';
import {
  advertsGetMinMaxPrice,
  filterAdverts,
  loadTags,
} from '../../store/actions';

const SearchContainer = () => {
  const tags = useSelector(getTags);
  const prices = useSelector(getMinMaxPrice);
  const adverts = useSelector(getAdverts);
  const [currentParams, setCurrentParams] = useState<{ [key: string]: string }>(
    {}
  );
  const [searchParams, setSearchParams] = useSearchParams();

  const { isFetching } = useSelector(getUi);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (tags.length > 0) return;
    dispatch(loadTags());
  }, [tags, dispatch]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchParams: { [key: string]: string } = {};
    params.forEach((value, key) => (searchParams[key] = value));

    if (Object.keys(searchParams).length === 0) return;

    setCurrentParams(searchParams);

    dispatch(filterAdverts(searchParams));
  }, [dispatch]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    searchParams.delete('name');
    searchParams.delete('type');
    searchParams.delete('tags');
    searchParams.delete('minPrice');
    searchParams.delete('maxPrice');

    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get('productName');
    const type = formData.get('type');
    const tags = formData.getAll('tags');
    const price = formData.getAll('price');

    if (name) searchParams.set('name', name.toString());
    if (type) searchParams.set('type', type.toString());
    if (tags.length >= 1) searchParams.set('tags', tags.join('-'));
    if (price) {
      searchParams.set('minPrice', price[0].toString());
      searchParams.set('maxPrice', price[1].toString());
    }

    const querySearch: { [key: string]: string } = {};

    searchParams.forEach((value, key) => (querySearch[key] = value));

    setSearchParams(searchParams);
    dispatch(filterAdverts(querySearch));
  };

  const handleReset = () => {
    const form = document.getElementById('search-form') as HTMLFormElement;
    if (form) {
      console.log('reset');
      form.reset();
    }
    dispatch(filterAdverts({}));
    dispatch(advertsGetMinMaxPrice(adverts));
  };

  return (
    <StyledSearchContainer>
      <div className="search-form">
        <form id="search-form" onSubmit={handleSubmit}>
          <h4>Search</h4>
          <div className="form-center">
            <FormRowInput
              required={false}
              type="search"
              name="productName"
              labelText="name"
              defaultValue={currentParams.name ? currentParams.name : ''}
              disabled={isFetching}
            />
            <FormSearchPrices defaultValue={[prices.min, prices.max]} />
            <FormRowSelect
              name="type"
              types={['all', 'On sale', 'Search']}
              selected={currentParams.type ? currentParams.type : 'all'}
            />
            <FormRowTags tags={tags} disabled={isFetching} />
            <div className="btn-group">
              <Link
                className="btn btn-block form-btn"
                to={`/adverts`}
                onClick={handleReset}
              >
                Reset Search Values
              </Link>
              <SubmitButton />
            </div>
          </div>
        </form>
      </div>
    </StyledSearchContainer>
  );
};

export default SearchContainer;
