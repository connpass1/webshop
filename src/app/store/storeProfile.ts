
import {Reducer} from "redux";
import {ICustomer, IEntity, IFetchCustomer} from "./Models";
import {ActionTypes} from "./saga";


export const actionsProfile={
  getRequest: () => ({type: ActionTypes.GetCustomerRequest}),

  getSuccess: (Customer: ICustomer) => ({
    type: ActionTypes.GetCustomerSuccess,
    Customer
  }),
  RequestFiled: (error: string) => ({
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

  saveRequest: (profile: ICustomer) => ({type: ActionTypes.SaveProfileRequest, profile}),

  saveSuccess: (profile: ICustomer) => ({
    type: ActionTypes.SaveProfileSuccess,
    profile
  }),
  saveFiled: (error: string) => ({
    type: ActionTypes.CustomerRequestFiled, error

  }),
};


export const profileReducer: Reducer<any>=(
  state={},
  action: any,
): IFetchCustomer => {
  switch (action.type) {
    case ActionTypes.GetCustomerRequest:
      delete state.errorFetching;
      delete state.Customer;
      return {...state, fetching: true};
    case ActionTypes.GetCustomerSuccess:
      delete state.fetching;
      return {...state, Customer: action.Customer};
    case ActionTypes.CustomerRequestFiled:
      delete state.fetching;
      delete state.Customer;
      return {
        ...state, errorFetching: action.error
      };


    // profile
    case ActionTypes.SaveProfileRequest:
      delete state.errorUpload;
      delete state.profile;
      return {...state, profile: action.profile, fetching: true};
    case ActionTypes.SaveProfileSuccess:
      state.customer={...state.profile}
      delete state.fetching;
      delete state.profile;
      return {...state, items: action.profile};
    case ActionTypes.SaveProfileFiled:
      delete state.fetching;
      delete state.profile;
      return {
        ...state, errorUpload: action.error
      };

    default:
      return state;
  }
};
export const itemReducer: Reducer<any>=(
  state={},
  action: any,
): IFetchCustomer => {
  switch (action.type) {
    case ActionTypes.GetCustomerRequest:
      delete state.errorFetching;
      delete state.Customer;
      return {...state, fetching: true};
    case ActionTypes.GetCustomerSuccess:
      delete state.fetching;
      return {...state, Customer: action.Customer};
    case ActionTypes.CustomerRequestFiled:
      delete state.fetching;
      delete state.Customer;
      return {
        ...state, errorFetching: action.error
      };

    // profile
    case ActionTypes.SaveProfileRequest:
      delete state.errorUpload;
      delete state.profile;
      return {...state, profile: action.profile, upload: true};
    case ActionTypes.SaveProfileSuccess:
      state.customer={...state.profile}
      delete state.fetching;
      delete state.profile;
      return {...state, items: action.profile};
    case ActionTypes.SaveProfileFiled:
      delete state.fetching;
      delete state.profile;
      return {
        ...state, errorUpload: action.error
      };

    default:

      return state;
  }
};


 //export const reducer=fetchReducer