
import {Reducer} from "redux";
import {IItem, IFetchCart} from './Models';

export enum ActionTypesCart {
  //adToCartRequest="AD_TO_CARD_REQUEST",
  adToCart="AD_TO_CARD",
  clearCart="CLEAR_CARD",

}

export const actionsCart={
  //adToCartRequest: (item: IItem) => ({type: ActionTypesCart.adToCartRequest, item}), 
  adToCart: (item: IItem) => ({type: ActionTypesCart.adToCart, item}),
  clearCart: () => ({type: ActionTypesCart.clearCart}),

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

    // case ActionTypesCart.adToCartRequest:

    //   state={
    //     cart: [...state.cart],
    //    fetching: true,
    //    errorFetching: 0
    //  }
    //  return {...state}

    case ActionTypesCart.adToCart:
      state.cart=state.cart.filter(it => action.item.id!==it.id)
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
