import { IEntity, IFetchCart, IFetchContent, IFetchCustomer, IFetchMessage } from "../models/IFases";
function isObject(object: any) {
  return object != null && typeof object === "object";
}
export function isEqual(obj1: any, obj2: any) {
  let props1 = Object.getOwnPropertyNames(obj1);
  let props2 = Object.getOwnPropertyNames(obj2);
  if (props1.length !== props2.length) {
    return false;
  }
  for (let i = 0; i < props1.length; i++) {
    let val1 = obj1[props1[i]];
    let val2 = obj2[props1[i]];
    let isObjects = isObject(val1) && isObject(val2);
    if ((isObjects && !isEqual(val1, val2)) || (!isObjects && val1 !== val2)) {
      return false;
    }
  }
  return true;
}
export function getErrorStatus(e: any, status?: number) {
  try {
    return e.response.status as number;
  } catch (e) {
    return status ? status : 500;
  }
}
export function compare(a: IEntity, b: IEntity) {
  if (a.name < b.name) return -1;
  if (a.id > b.id) return 1;
  return 0;
}
export const mapCart = (state: { cartReducer: IFetchCart }) => state.cartReducer;
export const mapFetchUser = (state: { profileReducer: IFetchCustomer }) => state.profileReducer;
export const mapCustomer = (state: { profileReducer: IFetchCustomer }) => state.profileReducer.customer;
export const mapMessage = (state: { messageReducer: IFetchMessage }) => state.messageReducer;
export const mapContent = (state: { contentReducer: IFetchContent }) => state.contentReducer;
