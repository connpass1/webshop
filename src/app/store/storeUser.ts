import {Reducer} from "redux";
import {ICustomer, IFetchCustomer} from "./Models";
export enum ActionTypesLogin {
  loginRequest="LOGIN_REQUEST",
  registrationRequest="REGISTRATION_REQUEST",
  loginSuccess="LOGIN_SUCCESS",
  loginFiled="LOGIN_FILED",
  logoutRequest="LOGOUT_REQUEST",
  logoutSuccess="LOGOUT_SUCCESS",
  logoutFiled="LOGIN_FILED",

}
export const actionsUser={
  loginUserRequest: (name: string, password: string) => ({type: ActionTypesLogin.loginRequest, name, password}),
  registrationUserRequest: (name: string, password: string) => ({type: ActionTypesLogin.registrationRequest, name, password}),
  logoutUserRequest: (id: number) => ({type: ActionTypesLogin.logoutRequest, id}),

  getLoginSuccess: (customer: ICustomer) => ({
    type: ActionTypesLogin.loginSuccess,
    customer
  }),
  loginFiled: (error: number) => ({
    type: ActionTypesLogin.loginFiled, error
  }),

  logoutSuccess: () => ({
    type: ActionTypesLogin.logoutSuccess
  }),
  logoutFiled: (error: number) => ({
    type: ActionTypesLogin.logoutFiled, error
  }),
};


export const profileReducer: Reducer=(
  state: IFetchCustomer={customer: {}, fetching: false, errorFetching: 0},
  action,
): IFetchCustomer => {

  switch (action.type) {
    case ActionTypesLogin.loginRequest:
    case ActionTypesLogin.registrationRequest:
      return {...state, fetching: true, errorFetching: 0};
    case ActionTypesLogin.loginSuccess:
      console.log(action.customer);

      return {customer: action.customer, fetching: false, errorFetching: 0};
    case ActionTypesLogin.loginFiled:
      return {
        ...state, errorFetching: action.error, fetching: false
      };
    case ActionTypesLogin.logoutRequest:

      return {customer: {}, fetching: false, errorFetching: 0};
    case ActionTypesLogin.logoutFiled:

      return {customer: {}, fetching: false, errorFetching: action.error};
    default:
      return state;
  }
};
