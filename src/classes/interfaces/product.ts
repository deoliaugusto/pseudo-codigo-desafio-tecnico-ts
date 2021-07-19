export interface ProductProtocol {
  name: string;
  _amount: number;
  category: string;

  get amount(): number;
}
