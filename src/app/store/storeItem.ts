
import {Reducer} from "redux";
import {IEntity, IFetchCustomer, IItem} from './Models';

export enum ActionTypesItems {

  GetItemsRequest="GET_ITEMS_REQUEST",
  GetItemsSuccess="GET_ITEMS_SUCCESS",
  ItemsRequestFiled="ITEMS_REQUEST_FAILED",

}

export const actionsItems={
  getRequest: () => ({type: ActionTypesItems.GetItemsRequest}),

  getSuccess: (items: IItem) => ({
    type: ActionTypesItems.GetItemsSuccess,
    items
  }),
  RequestFiled: (error: string) => ({
    type: ActionTypesItems, error

  }),
  getItemsRequest: () => ({type: ActionTypesItems.GetItemsRequest}),

  getItemsSuccess: (items: IEntity[]) => ({
    type: ActionTypesItems.GetItemsSuccess,
    items
  }),
  ItemsRequestFiled: (error: string) => ({
    type: ActionTypesItems.ItemsRequestFiled, error

  }),


};

export const actions={

  getItemsRequest: () => ({type: ActionTypesItems.GetItemsRequest}),

  getItemsSuccess: (items: IEntity[]) => ({
    type: ActionTypesItems.GetItemsSuccess,
    items
  }),
  ItemsRequestFiled: (error: string) => ({
    type: ActionTypesItems.ItemsRequestFiled, error

  }),


};


export const itemReducer: Reducer<any>=(
  state={},
  action: any,
): IFetchCustomer => {
  switch (action.type) {


    case ActionTypesItems.GetItemsRequest:
      delete state.errorFetching;
      delete state.items;
      return {...state, fetching: true};
    case ActionTypesItems.GetItemsSuccess:
      delete state.fetching;
      return {...state, items: action.items};
    case ActionTypesItems.ItemsRequestFiled:
      delete state.fetching;
      delete state.items;
      return {
        ...state, errorFetching: action.error
      };


    default:

      return state;
  }
}
