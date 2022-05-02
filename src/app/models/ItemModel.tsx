import { ItemPropertyModel } from "./ItemProperties";
import { IEntity, IItemDetail, ISlug } from "./IFases";

export class ItemModel implements IEntity {
  name = "";
  id = 0;
  quantity = 0;
  // @ts-ignore
  parent: string | undefined;
  icon? = "";
  price = 0;
  description = "";
  amount = 0;
  caption = "";
  photos: string[] = [];
  properties: ItemPropertyModel[] = [];
  detailId = 0;
  checked?: boolean;


  constructor(detail: IItemDetail | undefined) {
    if (!detail) return;
    const item = detail.item;
    if (!item) return;
    this.name = item.name;
    this.id = item.id;
    this.price = item.price;
    this.quantity = item.quantity;
    this.parent = item .parent;
    this.icon = item?.icon;
    this.price = item.price;
    this.description = detail.description;
    this.amount = detail.amount;
    this.caption = detail.caption;
    this.photos = detail.photos ? detail.photos : [];
    this.properties = detail.properties ? detail.properties : [];
    this.detailId = detail.id;
  }
}