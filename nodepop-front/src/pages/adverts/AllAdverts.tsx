import { Link } from 'react-router-dom';

import Wrapper from './styles/AllAdvertsWrapper';

import { Advert } from '../../components';

import SearchContainer from '../../components/search/SearchContainer';
import { useAdverts } from '../../context/AdvertsContext';

const AllAdverts = () => {
  const { adverts, isFirstAdvert } = useAdverts();

  return (
    <Wrapper>
      {isFirstAdvert ? (
        <h2>
          Currently there are no Adverts, do you want to{' '}
          <Link to="new" className="create-link">
            Create One?
          </Link>
        </h2>
      ) : (
        <div className="adverts">
          <SearchContainer />

          {adverts.length > 0 ? (
            adverts.map((advert) => {
              return <Advert key={advert.id} {...advert} />;
            })
          ) : (
            <p className="alert">No Adverts Found</p>
          )}
        </div>
      )}
    </Wrapper>
  );
};

export default AllAdverts;
