import { UserModel } from "./UserModel";
import { SettingModel } from "./SettingModel";
import { ItemPropertyModel } from "./ItemProperties";

export interface IEntity extends ISlug {
  parent: string;
}

export interface ISlug {
  id: number;
  name: string;
  icon?: string;
}

export interface IPageAble {
  totalPages: number;
  content: any[];

}

export interface IItem extends IEntity {
  price: number;
  quantity: number;
  detailId: number;
  checked: boolean;
}


export interface IItemDetail {
  item: IItem;
  id: number;
  amount: number;
  caption: string;
  description: string;
  photos: string[];
  properties: ItemPropertyModel[];
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
