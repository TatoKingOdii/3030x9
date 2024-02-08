import {Category} from "./category";

export interface Item {
  id: string,
  name: string,
  quantity: number,
  category: Category | null,
  receiveDate: Date | null,
  hasExpiration: boolean,
  expirationDate: Date | null
}
