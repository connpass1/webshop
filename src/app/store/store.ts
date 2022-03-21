
import {Reducer} from "redux";
import {ICustomer, IEntity, IFetchCustomer} from "./Models";

export enum ActionTypes {
  GetCustomerRequest="GET_CUSTOMER_REQUEST",
  GetCustomerSuccess="GET_CUSTOMER_SUCCESS",
  CustomerRequestFiled="CUSTOMER_REQUEST_FAILED",
  GetItemsRequest="GET_ITEMS_REQUEST",
  GetItemsSuccess="GET_ITEMS_SUCCESS",
  ItemsRequestFiled="ITEMS_REQUEST_FAILED",
  saveProfileRequest="saveProfileRequest",
  saveProfileSuccess="saveProfileSUCCESS",
  saveProfileFiled="saveProfileFAILED",

}
export const actions={
  getCustomerRequest: () => ({type: ActionTypes.GetCustomerRequest}),

  getCustomerSuccess: (Customer: ICustomer) => ({
    type: ActionTypes.GetCustomerSuccess,
    Customer
  }),
  CustomerRequestFiled: (error: string) => ({
    type: ActionTypes.CustomerRequestFiled, error

  }),
  getItemsRequest: () => ({type: ActionTypes.GetItemsRequest}),

  getItemsSuccess: (items: IEntity[]) => ({
    type: ActionTypes.GetItemsSuccess,
    items
  }),
  ItemsRequestFiled: (error: string) => ({
    type: ActionTypes.ItemsRequestFiled, error

  }),

  saveProfileRequest: (profile: ICustomer) => ({type: ActionTypes.saveProfileRequest, profile}),

  saveProfileSuccess: (profile: ICustomer) => ({
    type: ActionTypes.saveProfileSuccess,
    profile
  }),
  saveProfileFiled: (error: string) => ({
    type: ActionTypes.CustomerRequestFiled, error

  }),
};


const fetchReducer: Reducer<any>=(
  state={},
  action: any,
): IFetchCustomer => {
  switch (action.type) {
    case ActionTypes.GetCustomerRequest:
      delete state.errorFetchingCustomer;
      delete state.Customer;
      return {...state, fetchingCustomer: true};
    case ActionTypes.GetCustomerSuccess:
      delete state.fetchingCustomer;
      return {...state, Customer: action.Customer};
    case ActionTypes.CustomerRequestFiled:
      delete state.fetchingCustomer;
      delete state.Customer;
      return {
        ...state, errorFetchingCustomer: action.error
      };
    // items
    case ActionTypes.GetItemsRequest:
      delete state.errorFetchingItems;
      delete state.items;
      return {...state, fetchingItems: true};
    case ActionTypes.GetItemsSuccess:
      delete state.fetchingItems;
      return {...state, items: action.items};
    case ActionTypes.ItemsRequestFiled:
      delete state.fetchingItems;
      delete state.items;
      return {
        ...state, errorFetchingItems: action.error
      };
    // profile
    case ActionTypes.saveProfileRequest:
      delete state.errorFetchingProfile;
      delete state.profile;
      return {...state, profile: action.profile, fetchingProfile: true};
    case ActionTypes.saveProfileSuccess:
      state.customer={...state.profile}
      delete state.fetchingProfile;
      delete state.profile;
      return {...state, items: action.profile};
    case ActionTypes.saveProfileFiled:
      delete state.fetchingProfile;
      delete state.profile;
      return {
        ...state, errorFetchingProfile: action.error
      };

    default:

      return state;
  }
};
export const reducer=fetchReducer 