import { ISlug } from "./IFases";


export class ItemPropertyModel implements ISlug {

  id: number;
  name: string;
  value: string;

  constructor(property: ItemPropertyModel) {
    this.id = property.id;
    this.name = property.name;
    this.value = property.value;
  }

}