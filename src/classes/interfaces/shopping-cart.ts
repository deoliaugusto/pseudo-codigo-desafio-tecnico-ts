import { ProductProtocol } from '../interfaces/product';

export declare interface ShoppingCartProtocol {
  readonly _items: Array<ProductProtocol>;

  get items(): Array<ProductProtocol>;
  isEmpty(): boolean;
}
