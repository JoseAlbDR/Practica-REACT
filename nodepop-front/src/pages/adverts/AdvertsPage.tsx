import Wrapper from './styles/AllAdvertsWrapper';
import { EmptyAdverts, Advert } from '../../components/';
import { ItemList, Spinner } from '../../components/shared';
import { useSelector } from 'react-redux';
import { getAdverts, getFilteredAdverts, getUi } from '../../store/selectors';
import SearchContainer from '../../components/search/SearchContainer';

const AdvertsPage = () => {
  const adverts = useSelector(getAdverts);
  const filteredAdverts = useSelector(getFilteredAdverts);
  const { isFetching } = useSelector(getUi);

  const isFirstAdvert = adverts.length === 0;

  if (isFetching) return <Spinner />;

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
          items={filteredAdverts}
          render={(advert) => {
            return <Advert key={advert.id} {...advert} />;
          }}
        />
      )}
    </Wrapper>
  );
};

export default AdvertsPage;
