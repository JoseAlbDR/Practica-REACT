import { LoaderFunctionArgs, useLoaderData } from 'react-router-dom';
import customFetch from '../../api/customFetch';
import { Advert } from '../../components';
import { IAdvert } from '../../interfaces/advert.interface';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

export const loader = async (data: LoaderFunctionArgs) => {
  const {
    params: { id },
  } = data;

  try {
    const advert = await customFetch.get(`/v1/adverts/${id}`);
    return advert;
  } catch (error) {
    console.log(error);
    if (error instanceof AxiosError) {
      if (error?.response?.status === 404) {
        toast.error('Advert not found');
        throw error;
      }
    }
    toast.error('Error loading advert, try again later');
    return error;
  }
};

const AdvertDetail = () => {
  const advert = useLoaderData() as IAdvert;

  return <Advert type="detail" {...advert} />;
};

export default AdvertDetail;
