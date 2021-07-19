import { OrderStatus } from './order-status';

export interface OrderProtocol {
  id: string;
  items: Array<any>;
  user_Id: string;
  amount: number;
  _orderStatus: OrderStatus;

  get orderStatus(): OrderStatus;

  set orderStatus(status: OrderStatus);
}
