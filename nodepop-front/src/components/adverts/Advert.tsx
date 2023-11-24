import { SyntheticEvent } from 'react';
import { FaMoneyBill } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import Wrapper from './styles/AdvertWrapper';
import onSale from '../../assets/images/sell.svg';
import search from '../../assets/images/search.svg';
import errorImg from '../../assets/images/no-image-icon.png';

import { AdvertInfo, AdvertTags } from '../';
import { ConfirmModal as ConfirmDelete, Modal } from '../shared/';
import { AdvertProps } from '../../interfaces/advert.interface';
import { deleteAdvert } from './service';
import { useState } from 'react';
import { toast } from 'react-toastify';

const Advert = ({
  name,
  sale,
  price,
  tags,
  photo,
  id,
  type = '',
}: AdvertProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleDeleteAdvert = async (id: string) => {
    try {
      setIsLoading(true);
      await deleteAdvert(id);
      navigate('/adverts');
    } catch (error) {
      console.log(error);
      toast.error('There was an error deleting the Advert, try again later');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageError = (event: SyntheticEvent<HTMLImageElement>) => {
    console.log('error');
    event.currentTarget.src = '../../assets/images/no-image-icon.png';
  };

  return (
    <Wrapper $type={type}>
      {type === 'detail' && (
        <img
          src={photo || errorImg}
          alt={`${name} image`}
          onError={handleImageError}
          className="img"
        />
      )}

      <div className="content">
        <div className="content-info">
          <h2 className="title">{name}</h2>
          <div className="content-header">
            <div className={`status ${sale ? 'on-sale' : 'search'}`}>
              {sale ? 'on-sale' : 'search'}
              <img
                src={sale ? onSale : search}
                alt={sale ? 'on-sale' : 'search'}
              />
            </div>
          </div>
          <AdvertInfo icon={<FaMoneyBill />} text={price + '€'} />
          <AdvertTags tags={tags} />
        </div>
        {type === 'detail' ? (
          <Modal>
            <Modal.Open
              opens="delete"
              render={(openModal) => (
                <button
                  className="btn btn-block danger-btn"
                  onClick={openModal}
                >
                  Delete Advert
                </button>
              )}
            />
            <Modal.Window
              name="delete"
              render={(closeModal) => (
                <ConfirmDelete
                  isLoading={isLoading}
                  type="delete"
                  resourceName="advert"
                  onCloseModal={closeModal}
                  onConfirm={() => handleDeleteAdvert(id)}
                />
              )}
            />
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
