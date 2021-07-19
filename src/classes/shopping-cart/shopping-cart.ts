import { ProductProtocol } from '../interfaces/product';
import { ShoppingCartProtocol } from '../interfaces/shopping-cart';

export class ShoppingCart implements ShoppingCartProtocol {
  constructor(public readonly _items: Array<ProductProtocol>) {}

  get items(): Array<ProductProtocol> {
    return this._items;
  }

  isEmpty(): boolean {
    return this._items.length <= 0;
  }
}
