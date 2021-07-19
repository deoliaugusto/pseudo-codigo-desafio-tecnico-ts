/* eslint-disable */
import { ShoppingCart } from './classes/shopping-cart/shopping-cart'
import { Product } from "./classes/product/product";
import { OrdersService } from './services/orders-service'


const shoppingCart = new ShoppingCart([new Product('cd', 1, 'antigo'), new Product('ssd', 1, 'novo')]);

const checkoutTask = new OrdersService();

checkoutTask.checkout(shoppingCart, "1", "PRIMEIRA COMPRA")
