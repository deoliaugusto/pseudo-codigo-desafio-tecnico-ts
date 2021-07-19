import { CategoriesProtocol } from './categories';

export interface DiscontProtocol {
  categories: CategoriesProtocol;
  scope: string;
  type: string;
  percentage: number;
  amount: number;
}
