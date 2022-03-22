

import {Reducer} from "redux";
import {ICustomer, IFetchCustomer} from "./Models";
import {ActionTypes} from "./saga";


export const actionsProfile={
  getProfileRequest: () => ({type: ActionTypes.GetCustomerRequest}),

  getProfileSuccess: (Customer: ICustomer) => ({
    type: ActionTypes.GetCustomerSuccess,
    Customer
  }),
  ProfileRequestFiled: (error: string) => ({
    type: ActionTypes.CustomerRequestFiled, error
  }),

  saveProfileRequest: (profile: ICustomer) => ({type: ActionTypes.SaveProfileRequest, profile}),

  saveProfileSuccess: (profile: ICustomer) => ({
    type: ActionTypes.SaveProfileSuccess,
    profile
  }),
  saveProfileFiled: (error: string) => ({
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
      delete state.errorFetching;
      return {...state, fetching: true};
    case ActionTypes.SaveProfileSuccess:
      return {Customer: action.profile as ICustomer};
    case ActionTypes.SaveProfileFiled:
      delete state.fetching;
      return {
        ...state, errorFetching: action.error
      };

    default:
      return state;
  }
};




 //export const reducer=fetchReducer