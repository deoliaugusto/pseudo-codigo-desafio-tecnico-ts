import { CategoriesProtocol } from '../interfaces/categories';
import { Category } from './';

export class Categories implements CategoriesProtocol {
  private readonly _category: Category[] = [];

  include(category: string): boolean {
    return this._category.includes(category);
  }
}
