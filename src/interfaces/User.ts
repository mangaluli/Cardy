export default interface User {
  email: string;
  password: string;
  name?: string;
  isBusiness?: boolean;
  cardIds?: number[];
  lovedCardIds?: number[];
  id?: number;
}