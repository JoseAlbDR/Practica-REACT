import { FaMoneyBill } from 'react-icons/fa';

import Wrapper from './styles/AdvertWrapper';
import onSale from '../../assets/images/sell.svg';
import search from '../../assets/images/search.svg';
import errorImg from '../../assets/images/Image_not_available.png';
import { AdvertInfo, AdvertTags } from '../';
import { AdvertProps } from '../../interfaces/advert.interface';
import { SyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';

const Advert = ({
  name,
  sale,
  price,
  tags,
  photo,
  id,
  type = '',
}: AdvertProps) => {
  const navigate = useNavigate();

  const handleImageError = (event: SyntheticEvent<HTMLImageElement>) => {
    console.log('error');
    event.currentTarget.src = '../../assets/images/Image_not_available.png';
  };

  console.log(id);

  return (
    <Wrapper>
      <img
        src={photo || errorImg}
        alt={`${name} image`}
        onError={handleImageError}
        className="img"
      />
      <div className="content">
        <div className="content-header">
          <div className={`status ${sale ? 'on-sale' : 'search'}`}>
            {sale ? 'on-sale' : 'search'}
            <img
              src={sale ? onSale : search}
              alt={sale ? 'on-sale' : 'search'}
            />
          </div>
        </div>
        <h2 className="title">{name}</h2>
        <AdvertInfo icon={<FaMoneyBill />} text={price + '€'} />
        <AdvertTags tags={tags} />
        {type === 'detail' ? (
          <button className="btn btn-block danger-btn">Delete Advert</button>
        ) : (
          <button
            className="btn btn-block"
            onClick={() => {
              navigate(id);
            }}
          >
            See Detail
          </button>
        )}
      </div>
    </Wrapper>
  );
};

export default Advert;
