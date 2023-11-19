import { Link } from 'react-router-dom';

import Wrapper from './styles/AllAdvertsWrapper';

import { Advert } from '../../components';

import SearchContainer from '../../components/search/SearchContainer';
import { useAdverts } from '../../context/AdvertsContext';

const AllAdverts = () => {
  const { adverts } = useAdverts();

  return (
    <Wrapper>
      {adverts.length === 0 ? (
        <h2>
          Currently there are no Adverts, do you want to{' '}
          <Link to="new" className="create-link">
            Create One?
          </Link>
        </h2>
      ) : (
        <div className="adverts">
          <SearchContainer />
          {adverts.map((advert) => {
            return <Advert key={advert.id} {...advert} />;
          })}
        </div>
      )}
    </Wrapper>
  );
};

export default AllAdverts;
