import { DiscontProtocol } from '../classes/interfaces/discount';
import { OrderProtocol } from '../classes/interfaces/order';
import { ClientPostgres } from './postgres';

export class Repository {
  private readonly _client;

  constructor() {
    this._client = new ClientPostgres();
  }

  async create(order: OrderProtocol, user_Id: string): Promise<void> {
    this._client.create('Pedido salvo com sucesso...');
  }

  async findDiscount(
    discountCode: string | undefined,
  ): Promise<DiscontProtocol | null> {
    if (!discountCode) {
      return null;
    }

    const res = await query(discountCode);

    return res.length > 0 ? res : null;
  }
}
