import customFetch from '../../api/customFetch';

export const deleteAdvert = async (id: string) => {
  await customFetch.delete(`/v1/adverts/${id}`);
};
