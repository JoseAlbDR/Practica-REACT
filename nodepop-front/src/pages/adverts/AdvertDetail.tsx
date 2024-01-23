import { Advert } from '../../components';

import { useSelector } from 'react-redux';
import { getAdvertDetail } from '../../store/selectors';
import { useEffect } from 'react';
import { useAppDispatch } from '../../main';
import { advertDetail } from '../../store/actions';
import { useParams } from 'react-router-dom';

const AdvertDetail = () => {
  const params = useParams();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(advertDetail(params.id!));
  }, [dispatch, params.id]);

  const advert = useSelector(getAdvertDetail);

  return <Advert type="detail" {...advert!} />;
};

export default AdvertDetail;
