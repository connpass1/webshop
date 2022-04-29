import { ItemPropertyModel } from "./ItemProperties";
import { IItem, IItemDetail, ISlug } from "./IFases";

export class ItemModel implements ISlug {
   name  :string
  id  :number
   quantity :number
 parent  :string
   icon  :string
   price :number
   description  :string
   amount  :number
 caption  :string
 photos  :string[]
   properties :ItemPropertyModel[]
  detailId  :number

  constructor(item:  IItem  ,  detail :  IItemDetail) {
    this.name = item.name
    this.id =item.id
    this.price = item.price
    this.quantity =item.quantity
    this.parent  =item.parent
    this.icon =item.icon
    this.price = item.price
    this.description = detail.description
    this.amount = detail.amount
    this.caption  =detail.caption
    this.photos =detail.photos
     this.properties =detail.properties
    this.detailId =detail.id
  }
}