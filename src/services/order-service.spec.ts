import { Repository } from './repository';
import { Messaging } from './messaging';
import { Order } from '../classes/order/order';
import { ShoppingCart } from '../classes/shopping-cart/shopping-cart';
import { UniqueIdentifier as uuid } from './unique-identifier';
import { Discount } from '../classes/discount/discount';
import { OrdersService } from './orders-service';
import { Product } from '../classes/product/product';
import { Categories } from '../classes/categories/categories';

const createSut = () => {
  const scope = 'ITEMS';
  const type = 'PERCENTAGE';
  const percentage = 10;
  const amount = 1;

  const repositoryMock = new Repository();
  const messagingMock = new Messaging();
  const productMock = new Product('cd', 1, 'antigo');
  const shoppingCartMock = new ShoppingCart([productMock]);
  const orderMock = new Order(uuid.uId, shoppingCartMock.items, user_Id, 0.0);
  const categoriesMock = new Categories();
  const discountMock = new Discount(
    categoriesMock,
    scope,
    type,
    percentage,
    amount,
  );
  const sut = new OrdersService();

  return {
    sut,
    shoppingCartMock,
    orderMock,
    messagingMock,
    repositoryMock,
    discountMock,
  };
};

const user_Id = '42';
const validDiscountCupom = 'Primeira Compra';

describe('Order', () => {
  it('should not checkout if cart is empty', () => {
    const { sut, shoppingCartMock } = createSut();
    const shoppingCartMockSpy = jest
      .spyOn(shoppingCartMock, 'isEmpty')
      .mockReturnValueOnce(true);
    sut.checkout(shoppingCartMock, user_Id, validDiscountCupom);
    expect(shoppingCartMockSpy).toHaveBeenCalledTimes(1);
    expect(sut).toThrow('Shopping Cart cannot be empty');
  });

  it('should checkout if cart is not empty', () => {
    const { sut, shoppingCartMock, orderMock } = createSut();
    const shoppingCartMockSpy = jest
      .spyOn(shoppingCartMock, 'isEmpty')
      .mockReturnValueOnce(false);
    const orderMockSpy = jest
      .spyOn(orderMock, 'orderStatus', 'get')
      .mockReturnValueOnce('closed');
    sut.checkout(shoppingCartMock, user_Id, validDiscountCupom);
    expect(shoppingCartMockSpy).toHaveBeenCalledTimes(1);
    expect(orderMockSpy).toBe('closed');
  });

  it('should send an email to customer', () => {
    const { sut, shoppingCartMock, messagingMock } = createSut();
    const messagingMockSpy = jest.spyOn(messagingMock, 'notify');
    sut.checkout(shoppingCartMock, user_Id, validDiscountCupom);
    expect(messagingMockSpy).toHaveBeenCalledTimes(1);
  });

  it('should save order', () => {
    const { sut, shoppingCartMock, repositoryMock } = createSut();
    const repositoryMockSpy = jest.spyOn(repositoryMock, 'create');
    sut.checkout(shoppingCartMock, user_Id, validDiscountCupom);
    expect(repositoryMockSpy).toHaveBeenCalledTimes(1);
  });

  it('should calculate total discount if correct discount code was giveded', () => {
    const { sut, shoppingCartMock, discountMock } = createSut();
    const discountMockSpy = jest.spyOn(discountMock, 'discountAmount');
    sut.checkout(shoppingCartMock, user_Id, validDiscountCupom);
    expect(discountMockSpy).toHaveBeenCalledTimes(1);
  });
});
