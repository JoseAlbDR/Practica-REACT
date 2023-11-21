import { LoaderFunctionArgs, useLoaderData } from 'react-router-dom';
import customFetch, { CustomAxiosError } from '../../api/customFetch';
import { Advert } from '../../components';
import { IAdvert } from '../../interfaces/advert.interface';
import { toast } from 'react-toastify';

export const loader = async (data: LoaderFunctionArgs) => {
  const {
    params: { id },
  } = data;

  try {
    const advert = await customFetch.get(`/v1/adverts/${id}`);
    return advert;
  } catch (error) {
    if (error instanceof CustomAxiosError && error.status === 404) {
      toast.error('Error loading advert, try again later');
      throw error;
    }
    return error;
  }
};

const AdvertDetail = () => {
  const advert = useLoaderData() as IAdvert;

  return <Advert type="detail" {...advert} />;
};

export default AdvertDetail;
