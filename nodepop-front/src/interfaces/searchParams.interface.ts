import { ITags } from './tags.interface';

export interface ISearchParams {
  productName: string;
  ['min-price']: number;
  ['max-price']: number;
  type: 'all' | 'On sale' | 'Search';
  tags: ITags;
}
