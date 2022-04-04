
import {Reducer} from "redux";
import {IItem, IFetchCart} from './Models';

export enum ActionTypesCart {
  //adToCartRequest="AD_TO_CARD_REQUEST",
  adToCart="AD_TO_CARD",
  clearCart="CLEAR_CARD",
  delArrayFromCart="DEL_FROM_CARD",
}

export const actionsCart={
  //adToCartRequest: (item: IItem) => ({type: ActionTypesCart.adToCartRequest, item}), 
  adToCart: (item: IItem) => ({type: ActionTypesCart.adToCart, item}),
  clearCart: () => ({type: ActionTypesCart.clearCart}),
  delArrayFromCart: (item: IItem[]) => ({type: ActionTypesCart.delArrayFromCart, item}),
};
const getFromLocalStorage=() => {
  let s=localStorage.getItem("cart")
  if (!s) return []
  try {
    return JSON.parse(s) as IItem[]
  }
  catch (e) {
    return []
  }
}
export const cartReducer: Reducer<any>=(
  state: IFetchCart={
    cart: getFromLocalStorage()
  },
  action: any
): IFetchCart => {

  switch (action.type) {
    case ActionTypesCart.delArrayFromCart:
      const arr=action.item as IItem[]
      state.cart=state.cart.filter(ar => !arr.find(rm => (rm.id===ar.id)))
      console.log("jjjjjjjjjjjjj"+JSON.stringify(state.cart));
      localStorage.setItem("cart", JSON.stringify(state.cart))
      return {cart: [...state.cart]}
    case ActionTypesCart.adToCart:
      state.cart=state.cart.filter(it => action.item.id!==it.id)
      action.item.checked=true;
      state={
        cart: action.item.quantity<1? [...state.cart]:
          [...state.cart, {...action.item}]
      }
      localStorage.setItem("cart", JSON.stringify(state.cart))
      return {...state};

    case ActionTypesCart.clearCart:
      state={
        cart: []
      }
      localStorage.removeItem("cart")
      return {...state};

    default:
      return state;
  }
}
