
import {Reducer} from "redux";
import {IItem, IOrder} from "./Models";

export enum ActionTypesCart { 
  adToCart="AD_TO_CARD",
  removeFromCart="REMOVE_FROM_CARD",
  clearCart="CLEAR_CARD", 
}

export const actionsCart={ 
  adToCart: (item: IItem) => ({type: ActionTypesCart.adToCart, item}),
  removeFromCart: (item: IItem) => ({type: ActionTypesCart, item}),
  clearCart: () => ({type: ActionTypesCart.clearCart}),

};

export const cartReducer: Reducer<any>=(
  state: IOrder={items: []},
  action: any
): IOrder => {
  switch (action.type) {

    case ActionTypesCart.adToCart:
      state.items.push(action.items)
      return {...state};
    case ActionTypesCart.removeFromCart: state.items.filter(it => it.item.name!==action.item.name);
      return {...state};
    case ActionTypesCart.clearCart:
      state.items=[]
      return {...state};
    default:
      return {...state};;
  }
}
