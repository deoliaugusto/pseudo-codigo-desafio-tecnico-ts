import { CategoriesProtocol } from '../interfaces/categories';
import { DiscontProtocol } from '../interfaces/discount';
import { OrderProtocol } from '../interfaces/order';

export class Discount implements DiscontProtocol {
  public constructor(
    public readonly categories: CategoriesProtocol,
    public readonly scope: string,
    public readonly type: string,
    public readonly percentage: number,
    public amount: number,
  ) {}

  discountAmount(order: OrderProtocol): number {
    let amount = order.amount;

    if (this.scope === 'ITEMS' && this.type === 'PERCENTAGE') {
      let totalDiscount = 0;
      for (const item of order.items) {
        if (this.categories.include(item.category)) {
          totalDiscount += item.amount * this.percentage;
        }
      }

      amount -= totalDiscount;
    }

    if (this.scope === 'ORDER' && this.type === 'PERCENTAGE') {
      amount *= 1 - this.percentage;
    }

    if (this.scope === 'ORDER' && this.type === 'VALUE') {
      amount -= this.amount > 0 ? (amount -= this.amount) : 0;
    }

    return amount;
  }
}
