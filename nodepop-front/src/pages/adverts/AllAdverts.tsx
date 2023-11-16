import { useLoaderData } from 'react-router-dom';
import { getAllAdverts } from './service';
import { IAdvert } from '../../interfaces/advert.interface';
import Wrapper from './styles/AllAdvertsWrapper';
import Advert from '../../components/adverts/Advert';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { Link } from 'react-router-dom';

export const loader = async () => {
  try {
    const adverts = await getAllAdverts();
    return adverts;
  } catch (error) {
    console.log(error);
    if (error instanceof AxiosError) {
      if (error?.response?.status === 401) return;
    }
    toast.error('Error loading adverts, try again later');
    return error;
  }
};

const AllAdverts = () => {
  const adverts = useLoaderData() as IAdvert[];
  return (
    <Wrapper>
      {adverts.length === 0 && (
        <h2>
          Currently there are no Adverts, do you want to{' '}
          <Link to="new" className="create-link">
            Create One?
          </Link>
        </h2>
      )}
      <div className="adverts">
        {adverts.map((advert) => {
          return <Advert key={advert.id} {...advert} />;
        })}
      </div>
    </Wrapper>
  );
};

export default AllAdverts;
