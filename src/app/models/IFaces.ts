 
import { UserModel } from "./UserModel";

 
export interface ISlug {
  id: number;
  name: string;
  icon?: string;
}

export interface ISetting{
  appBarLinks: ISlug[];
  footerLinks: ISlug[];
  categoryLinks: ISlug[];

}
 

export interface IItem extends ISlug {
  price: number;
  quantity: number;
  checked: boolean;
  parent: ISlug;
    measure: string;
  mass: number;
}

 

export interface IPage {
  content: IItem[];
  number: number;
  totalPages: number;
  totalElements: number;
}

interface IFetch {
  status: number;
}

export interface IOrderItem {
  id: number;
  quantity: number;
  item: IItem;
}

export interface IFetchCustomer extends IFetch {
  customer: UserModel;
}

export interface IFetchSettings extends IFetch {
  settings?: ISetting;
}

export interface IFetchContent extends IFetch {
  content: any;
}

export interface IFetchCart extends IFetch {
  cart: IItem[];
}
