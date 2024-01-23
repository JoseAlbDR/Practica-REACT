import Wrapper from './styles/AllAdvertsWrapper';
import { EmptyAdverts, Advert } from '../../components/';
import { ItemList, Spinner } from '../../components/shared';
import { useSelector } from 'react-redux';
import { getAdverts, getUi } from '../../store/selectors';

const AdvertsPage = () => {
  const adverts = useSelector(getAdverts);
  const { isFetching } = useSelector(getUi);

  const isFirstAdvert = adverts.length === 0;

  if (isFetching) return <Spinner />;

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
