import { FaMoneyBill } from 'react-icons/fa';

import Wrapper from './styles/AdvertWrapper';
import onSale from '../../assets/images/sell.svg';
import search from '../../assets/images/search.svg';
import errorImg from '../../assets/images/Image_not_available.png';
import { AdvertInfo, AdvertTags } from '../';
import { AdvertProps } from '../../interfaces/advert.interface';
import { SyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import ConfirmDelete from '../shared/ConfirmModal';
import Modal from '../shared/Modal';
import { deleteAdvert } from './service';

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

  const handleDeleteAdvert = async (id: string) => {
    console.log('Delete');
    try {
      await deleteAdvert(id);
      navigate('/adverts');
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const handleImageError = (event: SyntheticEvent<HTMLImageElement>) => {
    console.log('error');
    event.currentTarget.src = '../../assets/images/Image_not_available.png';
  };

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
          <Modal>
            <Modal.Open opens="delete">
              <button className="btn btn-block danger-btn">
                Delete Advert
              </button>
            </Modal.Open>
            <Modal.Window name="delete">
              <ConfirmDelete
                type="delete"
                resourceName="advert"
                onConfirm={() => handleDeleteAdvert(id)}
              />
            </Modal.Window>
          </Modal>
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
