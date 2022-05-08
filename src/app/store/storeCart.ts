import { Reducer } from "redux";
import { IFetchCart, IItem } from "../models/IFases";

export enum ActionTypesCart {
  adToCart = "AD_TO_CARD",
  clearCart = "CLEAR_CARD",
  delArrayFromCart = "DEL_FROM_CARD",
  makeOrderRequest = "MAKE_ORDER_REQUEST",
  makeOrderSuccess = "MAKE_ORDER_SUCCESS",
  makeOrderERROR = "MAKE_ORDER_ERROR",
}

export const actionsCart = {
  //adToCartRequest: (item: IItem) => ({type: ActionTypesCart.adToCartRequest, item}), 
  adToCart: (item:  IItem) => ({ type: ActionTypesCart.adToCart, item }),
  clearCart: () => ({ type: ActionTypesCart.clearCart }),
  delArrayFromCart: (items: IItem[]) => ({ type: ActionTypesCart.delArrayFromCart, items }),
  makeOrderRequest: (items: IItem[]) => ({ type: ActionTypesCart.makeOrderRequest, items }),
  makeOrderSuccess: (items: IItem[]) => ({ type: ActionTypesCart.makeOrderSuccess, items }),
  makeOrderERROR: (error: number) => ({ type: ActionTypesCart.makeOrderERROR, error })
};
const getFromLocalStorage = () => {
  let s = localStorage.getItem("cart");
  if (!s) return [];
  try {
    return JSON.parse(s) as IItem[];
  } catch (e) {
    return [];
  }
};
export const cartReducer: Reducer = (
  state: IFetchCart = {
    cart: getFromLocalStorage(), status: 0
  },
  action: any
): IFetchCart => {
  switch (action.type) {
    case ActionTypesCart.makeOrderRequest:
      return { cart: [...state.cart], status: -100 };
    case ActionTypesCart.makeOrderERROR:
      return {
        cart: [...state.cart], status: action.error
      };
    case ActionTypesCart.makeOrderSuccess:
      console.log(action.items.orderItems);
      const arr1: any[] = action.items.orderItems;
      for (let it in arr1) {
        console.log("jjjjjjj" + JSON.stringify(arr1[it]));
        const id = arr1[it];
        state.cart = state.cart.filter(ar => id === ar.id);
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
      return { cart: [...state.cart], status: 200 };
    case ActionTypesCart.delArrayFromCart:
      const arr = action.items as IItem[];
      state.cart = state.cart.filter(ar => !arr.find(rm => (rm.id === ar.id)));
      localStorage.setItem("cart", JSON.stringify(state.cart));
      return { cart: [...state.cart], status: 0 };
    case ActionTypesCart.adToCart:
      state.cart = state.cart.filter(it => action.item.id !== it.id);
      action.item.checked = true;
      state = {
        cart: action.item.quantity < 1 ? [...state.cart] :
          [...state.cart, { ...action.item }], status: 0
      };
      localStorage.setItem("cart", JSON.stringify(state.cart));
      return { ...state };
    case ActionTypesCart.clearCart:
      state = {
        cart: [], status: 0
      };
      localStorage.removeItem("cart");
      return { ...state };
    default:
      return state;
  }
};
