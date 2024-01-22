import Wrapper from './styles/AllAdvertsWrapper';
import { EmptyAdverts, Advert } from '../../components/';
import { ItemList } from '../../components/shared';
import { useSelector } from 'react-redux';
import { getAdverts } from '../../store/selectors';

const AdvertsPage = () => {
  const adverts = useSelector(getAdverts);

  const isFirstAdvert = adverts.length === 0;

  return (
    <Wrapper>
      <h1>Adverts</h1>
      {/* <SearchContainer /> */}
      {isFirstAdvert ? (
        <EmptyAdverts />
      ) : (
        <ItemList
          itemName="adverts"
          className="adverts"
          items={adverts}
          render={(advert) => {
            return <Advert key={advert.id} {...advert} />;
          }}
        />
      )}
    </Wrapper>
  );
};

export default AdvertsPage;
