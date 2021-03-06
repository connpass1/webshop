import { ISlug } from "./IFaces";

export class ItemModel implements ISlug {
  name = "";
  id = 0;
  parent: ISlug = { id: 0, name: "" };
  parents: ISlug[] = [];
  icon? = "";
  price = 0;
  caption = "";
  description = "";
  photo: string[] = [];
  composition: string[] = [];
  quantity = "UNLIMITED";
  mass = 0;
  measure = "gram";
  constructor(detail: any) {
    console.log(detail);

    if (!detail) return;
    const { id, description, photo, item, parents } = detail;
    if (!item) return;
    const { name, icon, price, quantity, caption, parent, mass, measure } = item;
    this.id = id ? id : 0;
    this.caption = caption ? caption : "";
    this.description = description ? description : "";
    this.photo = photo ? photo : [];
    this.name = name ? name : "";
    this.quantity = quantity ? quantity : "UNLIMITED";
    this.icon = icon ? icon : "";
    this.mass = mass ? mass : 0;
    this.measure = measure ? measure : "gram";
    this.price = price ? price : 0;
    this.parent = parent;
    this.parents = parents ? parents : [];
    if (this.photo.length === 0) this.photo.push("/img/box.png");
  }
}
export const createItemModel = (data: any) => {
  if (!data) return undefined;
  if (!data.item) return undefined;
  return new ItemModel(data);
};
