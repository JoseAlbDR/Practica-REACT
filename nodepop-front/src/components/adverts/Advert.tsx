import { FaMoneyBill } from 'react-icons/fa';

import Wrapper from './styles/AdvertWrapper';
import onSale from '../../assets/images/sell.svg';
import search from '../../assets/images/search.svg';

import { AdvertInfo, AdvertTags } from '../';
import { IAdvert } from '../../interfaces/advert.interface';

const Advert = ({ name, sale, price, tags, photo }: IAdvert) => {
  return (
    <Wrapper>
      <img src={photo} alt={`${name} image`} className="img" />
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
      </div>
    </Wrapper>
  );
};

export default Advert;
