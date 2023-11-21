import Wrapper from './styles/AllAdvertsWrapper';
import { useAdverts } from '../../context/AdvertsContext';
import SearchContainer from '../../components/search/SearchContainer';
import ItemList from '../../components/shared/ItemList';
import EmptyAdverts from '../../components/adverts/EmptyAdverts';
import { Advert } from '../../components';

const AdvertsPage = () => {
  const { adverts, isFirstAdvert } = useAdverts();

  return (
    <Wrapper>
      <h1>Adverts</h1>
      <SearchContainer />
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
