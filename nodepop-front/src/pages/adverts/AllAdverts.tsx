import AdvertsPage from './AdvertsPage';

import { loadAdverts, loadTags } from '../../store/actions';

import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getIsLoaded } from '../../store/selectors';
import { useAppDispatch } from '../../main';

const AllAdverts = () => {
  const dispatch = useAppDispatch();

  const isLoaded = useSelector(getIsLoaded);

  useEffect(() => {
    if (isLoaded) return;
    dispatch(loadAdverts());
    dispatch(loadTags());
  }, [dispatch, isLoaded]);

  return <AdvertsPage />;
};

export default AllAdverts;
