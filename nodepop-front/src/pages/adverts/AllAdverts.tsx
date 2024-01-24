import AdvertsPage from './AdvertsPage';

import { loadAdverts } from '../../store/actions';

import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getIsLoaded, getUi } from '../../store/selectors';
import { useAppDispatch } from '../../main';
import ErrorPage from '../error/ErrorPage';

const AllAdverts = () => {
  const dispatch = useAppDispatch();

  const { error } = useSelector(getUi);

  const isLoaded = useSelector(getIsLoaded);

  useEffect(() => {
    if (isLoaded) return;
    dispatch(loadAdverts());
  }, [dispatch, isLoaded]);

  if (error) return <ErrorPage />;
  return <AdvertsPage />;
};

export default AllAdverts;
