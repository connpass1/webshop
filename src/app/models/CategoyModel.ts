import { IEntity, IItem } from "./IFases";
import { ItemModel } from "./ItemModel";

export class CategoryModel  implements  IEntity{
  id: number;
  name: string;
  parent: string;
  icon: string;
  items : IItem[];
  childrenCategory: CategoryModel[];

  constructor(data: any) {
    this.id = data.id ? data.id : 0;
    this.name = data.name ? data.name : "";
    this.icon = data.icon ? data.icon : "";
    this.items = data.items ? data.items : [];
    this.parent = data.parent ? data.parent : "";
    this.childrenCategory = data.childrenCategory ? data.childrenCategory :[];
  }


}

