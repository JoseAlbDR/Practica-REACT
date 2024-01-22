import AdvertsPage from './AdvertsPage';

import { loadAdverts, loadTags } from '../../store/actions';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getIsLoaded } from '../../store/selectors';

const AllAdverts = () => {
  const dispatch = useDispatch();

  const isLoaded = useSelector(getIsLoaded);

  useEffect(() => {
    if (isLoaded) return;
    dispatch(loadAdverts());
    dispatch(loadTags());
  }, [dispatch, isLoaded]);

  return <AdvertsPage />;
};

export default AllAdverts;
