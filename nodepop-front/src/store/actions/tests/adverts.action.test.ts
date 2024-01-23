import { advertsLoadedSuccess } from '..';
import { IAdvert } from '../../../interfaces/advert.interface';
import { types } from '../../types';

describe('adverts.action.ts', () => {
  test('Should return a "ADVERTS_LOADED_SUCCESS" action with payload', () => {
    const adverts: IAdvert[] = [
      {
        name: 'test',
        sale: true,
        price: 123,
        tags: ['motor'],
        photo: 'test',
        id: 'test',
      },
      {
        name: 'test1',
        sale: false,
        price: 321,
        tags: ['motor', 'lifestyle', 'mobile', 'work'],
        photo: 'test1',
        id: 'test1',
      },
    ];

    const { payload, type } = advertsLoadedSuccess(adverts);

    expect(payload.length).toBe(2);
    expect(payload[0]).toEqual(adverts[0]);
    expect(payload[1]).toEqual(adverts[1]);

    expect(type).toBe(types.ADVERTS_LOADED_SUCCESS);
  });
});
