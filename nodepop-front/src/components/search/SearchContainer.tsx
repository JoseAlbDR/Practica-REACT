/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from 'react-router-dom';

import StyledSearchContainer from './styles/StyledSearchContainer';

import {
  FormSearchPrices,
  FormRowSelect,
  FormRowInput,
  FormRowTags,
} from '../shared/';

import { useSelector } from 'react-redux';
import { getAdverts, getTags, getUi } from '../../store/selectors';
import { useEffect } from 'react';
import { useAppDispatch } from '../../main';
import { loadTags } from '../../store/actions';

const SearchContainer = () => {
  const tags = useSelector(getTags);
  // const adverts = useSelector(getAdverts);
  const { isFetching } = useSelector(getUi);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (tags.length > 0) return;

    dispatch(loadTags());
  }, [tags, dispatch]);

  console.log({ tags });

  return (
    <StyledSearchContainer>
      <div className="search-form">
        <form id="search-form">
          <h4>Search</h4>
          <div className="form-center">
            <FormRowInput
              required={false}
              onChange={() => {}}
              type="search"
              name="productName"
              labelText="name"
              defaultValue=""
              disabled={isFetching}
            />
            <FormSearchPrices onChange={() => {}} defaultValue={[0, 1000]} />
            <FormRowSelect
              name="type"
              types={['all', 'On sale', 'Search']}
              selected={''}
              onChange={() => {}}
            />
            <FormRowTags tags={tags} disabled={isFetching} />
            <Link className="btn btn-block form-btn" to={`/adverts`}>
              Reset Search Values
            </Link>
          </div>
        </form>
      </div>
    </StyledSearchContainer>
  );
};

export default SearchContainer;
