import { useEffect } from "react";
import { IFetchCart, IFetchContent, IFetchCustomer, IFetchSettings, ISlug } from '../models/IFaces';
import { ActionTypesContent } from "./storeContent";
import { actionsSettings } from "./storeSettings";

//  unction isObject(object: any) {
 // return object != null && typeof object === "object";
//}

// export function isEqual(obj1: any, obj2: any) {
//   let props1 = Object.getOwnPropertyNames(obj1);
//   let props2 = Object.getOwnPropertyNames(obj2);
//   if (props1.length !== props2.length) {
//     return false;
//   }
//   for (let i = 0; i < props1.length; i++) {
//     let val1 = obj1[props1[i]];
//     let val2 = obj2[props1[i]];
//     let isObjects = isObject(val1) && isObject(val2);
//     if ((isObjects && !isEqual(val1, val2)) || (!isObjects && val1 !== val2)) {
//       return false;
//     }
//   }
//   return true;
// }

export function getErrorStatus(e: any, status?: number) {
  try {
    return e.response.status as number;
  } catch (e) {
    return status ? status : 500;
  }
}

export function compare(a: ISlug, b:  ISlug) {
  if (a.name < b.name) return -1;
  if (a.id > b.id) return 1;
  return 0;
}

export function phone(ph: number | undefined) {
  if (!ph) return "";
  let phone = "" + ph;
  if (phone.length < 10) return "???????????";
  phone = "+7 ( " + phone.slice(0, 4) + " ) " + phone.slice(4, 7) + " " + phone.slice(7, phone.length);
  return phone;
}

 

export function useOutsideClick(ref: { current: { contains: (arg0: any) => any; }; }, handler: { (this: Document, ev: MouseEvent): any; (this: Document, ev: MouseEvent): any; }) {
  useEffect(() => {
    document.addEventListener("mousedown", handler);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handler);
    };
  }, [ref, handler]);
}

export function isEmpty(obj: {}) {
  return Object.keys(obj).length === 0;
}

export type PropsContent1 = ReturnType<typeof mapContent>;
//export type PropsContent = ReturnType<typeof mapContent> & typeof actionsContent;
export type PropsSetting = ReturnType<typeof mapSettings> & typeof actionsSettings;
export const mapCart = (state: { cartReducer: IFetchCart }) => state.cartReducer;
export const mapFetchUser = (state: { profileReducer: IFetchCustomer }) => state.profileReducer;
export const mapCustomer = (state: { profileReducer: IFetchCustomer }) => state.profileReducer.customer;
export const mapContent = (state: { contentReducer: IFetchContent }) => state.contentReducer;
export const mapSettings = (state: { settingsReducer: IFetchSettings }) => state.settingsReducer;
export type PropsReq= (data: any) => { type: ActionTypesContent; data: any }  

export  type PropsContent = IFetchContent & {
  contentRequest: (url: string) => {
    type: ActionTypesContent;
    url: string;
  };
  delContentRequest: (data: any) => {
    type: ActionTypesContent;
    data: any;
  };
  saveContentRequest: (data: any) => {
    type: ActionTypesContent;
    data: any;
  };
}
 