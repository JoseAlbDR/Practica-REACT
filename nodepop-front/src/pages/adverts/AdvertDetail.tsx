import { Advert } from '../../components';

import { useSelector } from 'react-redux';
import { getAdvertDetail } from '../../store/selectors';

const AdvertDetail = () => {
  const advert = useSelector(getAdvertDetail);

  return <Advert type="detail" {...advert!} />;
};

export default AdvertDetail;
