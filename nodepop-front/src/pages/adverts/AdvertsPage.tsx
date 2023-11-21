import Wrapper from './styles/AllAdvertsWrapper';
import { useAdverts } from '../../context/AdvertsContext';
import { SearchContainer, EmptyAdverts, Advert } from '../../components/';
import { ItemList } from '../../components/shared';

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
