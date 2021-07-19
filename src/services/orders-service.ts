import { Repository } from './repository';
import { Messaging } from './messaging';
import { Order } from '../classes/order/order';
import { ShoppingCartProtocol } from '../classes/interfaces/shopping-cart';
import { UniqueIdentifier as uuid } from './unique-identifier';
import { Discount } from '../classes/discount/discount';

export class OrdersService {
  private readonly repository = new Repository();
  private readonly messaging = new Messaging();

  public async checkout(
    shoppingCart: ShoppingCartProtocol,
    user_Id: string,
    discountCode?: string,
  ): Promise<void> {
    if (shoppingCart.isEmpty()) {
      throw new Error('Shopping Cart cannot be empty');
    }

    const order = this.createOrder(shoppingCart, user_Id);
    order.orderStatus = 'closed';

    const discount = await this.repository.findDiscount(discountCode);

    if (discountCode != undefined && discount) {
      const { categories, scope, type, percentage, amount } = discount;
      const discountAmount = new Discount(
        categories,
        scope,
        type,
        percentage,
        amount,
      ).discountAmount(order);
    }

    await this.repository.create(order, user_Id);
    await this.messaging.notify(
      'orders-created-queue',
      JSON.stringify({ discountCode, order, user_Id }),
    );
  }

  private createOrder(cart: ShoppingCartProtocol, user_Id: string): Order {
    return new Order(uuid.uId, cart.items, user_Id, 0.0);
  }
}
