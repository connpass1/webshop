import { UserModel } from "./UserModel";
import { SettingModel } from "./SettingModel";
export interface IEntity extends ISlug {
  parent: string;
}

export interface ISlug {
  id: number;
  name: string;
  icon?: string;
}

export interface IItem extends IEntity {
  price: number;
  quantity: number;
  itemDetailId: number;
  checked: boolean;
}

export interface IItemProperty {
  id: number;
  name: string;
  property: string;
}

export interface IItemDetail {
  item: IItem;
  id: number;
  amount: number;
  caption: string;
  description: string;
  photos: string[];
  properties: IItemProperty;
}

export interface ICatalog extends IEntity {
  childrenCategory: ICatalog[];
  items: IItem[];
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
  settings?: SettingModel;
}

export interface IFetchContent extends IFetch {
  content: any;
}

export interface IFetchCart extends IFetch {
  cart: IItem[];
}
