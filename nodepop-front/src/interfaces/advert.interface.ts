import { ITags } from './tags.interface';

export interface IAdvert {
  name: string;
  sale: boolean;
  price: number;
  tags: ITags[];
  photo: string;
  id: string;
}
