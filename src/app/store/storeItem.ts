
import {Reducer} from "redux";
import {IEntity, IFetchCustomer, IItem} from './Models';
import {ActionTypes} from "./saga";


export const actionsItems={


  getItemsRequest: () => ({type: ActionTypes.GetItemsRequest}),

  getItemsSuccess: (items: IEntity[]) => ({
    type: ActionTypes.GetItemsSuccess,
    items
  }),
  ItemsRequestFiled: (error: string) => ({
    type: ActionTypes.ItemsRequestFiled, error

  }),
};
export const itemReducer: Reducer<any>=(
  state={},
  action: any,
): IFetchCustomer => {
  switch (action.type) {
    case ActionTypes.GetItemsRequest:
      delete state.errorFetching;
      delete state.items;
      return {...state, fetching: true};
    case ActionTypes.GetItemsSuccess:
      delete state.fetching;
      return {...state, items: action.items};
    case ActionTypes.ItemsRequestFiled:
      delete state.fetching;
      delete state.items;
      return {
        ...state, errorFetching: action.error
      };
    default:

      return state;
  }
}
