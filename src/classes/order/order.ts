import { OrderProtocol } from '../interfaces/order';
import { ProductProtocol } from '../interfaces/product';
import { OrderStatus } from '../interfaces/order-status';

export class Order implements OrderProtocol {
  public _orderStatus: OrderStatus = 'open';

  public constructor(
    public id: string,
    public items: Array<ProductProtocol>,
    public user_Id: string,
    public amount: number,
  ) {
    this.amount = items.reduce((acc, curVal) => {
      return (acc += curVal.amount);
    }, amount);
  }

  get orderStatus(): OrderStatus {
    return this._orderStatus;
  }

  set orderStatus(status: OrderStatus) {
    this._orderStatus = status;
  }
}
