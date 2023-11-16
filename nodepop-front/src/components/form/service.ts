import customFetch from '../../api/customFetch';

export const getTags = async () => {
  const tags = await customFetch.get('/v1/adverts/tags');
  return tags;
};
