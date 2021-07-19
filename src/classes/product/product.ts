import { ProductProtocol } from '../interfaces/product';

export class Product implements ProductProtocol {
  constructor(
    public name: string,
    public _amount: number,
    public category: string,
  ) {}

  get amount(): number {
    return this._amount;
  }
}
