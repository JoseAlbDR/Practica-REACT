import { IAdvert } from '../../interfaces/advert.interface';
import { getAdvert } from '../selectors';

describe('getAdvert', () => {
  const adverts: IAdvert[] = [
    {
      name: 'test',
      sale: true,
      price: 123,
      tags: ['motor'],
      photo: 'test',
      id: '1',
    },
    {
      name: 'test1',
      sale: false,
      price: 321,
      tags: ['motor', 'lifestyle', 'mobile', 'work'],
      photo: 'test1',
      id: '2',
    },
  ];
  const state = {
    auth: {
      isLoggedIn: false,
      rememberMe: false,
    },
    adverts: {
      loaded: false,
      data: adverts,
      params: {},
      advertDetail: null,
      filteredAdverts: [],
      prices: {
        min: 0,
        max: Infinity,
      },
    },
    tags: [],
    ui: {
      isFetching: false,
      error: null,
    },
  };
  test('Should return an advert ty id', () => {
    const id = '1';

    expect(getAdvert(id)(state)).toBe(adverts[0]);
  });

  test('Should not return any advert', () => {
    expect(getAdvert('3')(state)).toBeUndefined();
  });
});
