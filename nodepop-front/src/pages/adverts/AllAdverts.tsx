import { useLoaderData } from 'react-router-dom';
import { getAllAdverts } from './service';
import { IAdvert } from '../../interfaces/advert.interface';
import Wrapper from './styles/AllAdvertsWrapper';
import Advert from '../../components/adverts/Advert';

export const loader = async () => {
  try {
    const adverts = await getAllAdverts();
    return adverts;
  } catch (error) {
    console.log(error);
  }
};

const AllAdverts = () => {
  const adverts = useLoaderData() as IAdvert[];
  return (
    <Wrapper>
      {adverts.length === 0 && <h2>Currently there are no Adverts</h2>}
      <div className="adverts">
        {adverts.map((advert) => {
          return <Advert key={advert.id} {...advert} />;
        })}
      </div>
    </Wrapper>
  );
};

export default AllAdverts;
