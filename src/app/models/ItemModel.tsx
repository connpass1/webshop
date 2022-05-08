import { IItemDetail, ISlug } from "./IFases";

export class ItemModel implements ISlug {
  name = "";
  id = 0;
  parent: string | undefined = "";
  parentId = 0;
  parentIcon = "";
  parentName = "";
  icon? = "";
  price = 0;
  description = "";
  amount = 0;
  caption = "";
  photos: string[] = [];
  quantity = 0;

  constructor(detail: IItemDetail | undefined) {
    if (!detail) return;
    const { id, amount, caption, description, photos, item } = detail;

    if (!item) return;

    const { name, icon, price, quantity, parent } = item;

    this.id = id ? id : 0;
    this.amount = amount ? amount : 0;
    this.caption = caption ? caption : "";
    this.description = description ? description : "";
    this.photos = photos ? photos : [];
    this.name = name ? name : "";
    this.quantity = quantity ? quantity : 0;
    this.icon = icon ? icon : "";

    this.price = price ? price : 0;
    this.parent = parent ? parent : undefined;
    if (parent) {
      const s = parent.split("$");
      const arr = s[s.length - 1].split("@");
      this.parentId = Number(arr[1]);
      this.parentIcon = "" + arr[2];
      this.parentName = arr[0];
    }
  }
}
