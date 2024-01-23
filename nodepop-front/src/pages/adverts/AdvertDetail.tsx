import { Advert } from '../../components';

import { useSelector } from 'react-redux';
import { getAdvertDetail, getUi } from '../../store/selectors';
import { useEffect } from 'react';
import { useAppDispatch } from '../../main';
import { advertDetail } from '../../store/actions';
import { useParams } from 'react-router-dom';
import ErrorPage from '../error/ErrorPage';

const AdvertDetail = () => {
  const params = useParams();
  const { error } = useSelector(getUi);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(advertDetail(params.id!));
  }, [dispatch, params.id]);

  const advert = useSelector(getAdvertDetail);

  if (error || !advert) return <ErrorPage />;

  return <Advert type="detail" {...advert!} />;
};

export default AdvertDetail;
