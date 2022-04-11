import { IOrderItem } from "./IFases";
// export interface IOrder {
//   status: number;
//   id: number;
//   initDate: Date;
//   lastUpdateStatus: Date;
//   orderItems: IOrderItem[];
// }
export class OrderModel {
  quantity: number;
  id: number;
  initDate: Date;
  lastUpdateStatus: Date;
  orderItems: IOrderItem[];
  status: number;
  sum: number;
  constructor(data: OrderModel) {
    this.id = data.id;
    this.initDate = new Date(data.initDate);
    this.lastUpdateStatus = new Date(data.lastUpdateStatus);
    this.lastUpdateStatus = data.lastUpdateStatus;
    this.status = data.status;
    this.orderItems = data.orderItems;
    this.sum = 0;
    this.quantity = 0;
    for (let x in data.orderItems) {
      let item = data.orderItems[x];
      this.sum = this.sum + item.quantity * item.item.price;
      this.quantity = this.quantity + item.quantity;
    }
  }
}