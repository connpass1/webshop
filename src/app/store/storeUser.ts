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
  state: IFetchCustomer={customer: {}, status: 0},
  action,
): IFetchCustomer => {

  switch (action.type) {
    case ActionTypesLogin.loginRequest:
    case ActionTypesLogin.registrationRequest:
      return {...state, status: 100};
    case ActionTypesLogin.loginSuccess:
      console.log(action.customer);

      return {customer: action.customer, status: 0};
    case ActionTypesLogin.loginFiled:
      return {
        ...state, status: action.error
      };
    case ActionTypesLogin.logoutRequest:

      return {customer: {}, status: 0};
    case ActionTypesLogin.logoutFiled:

      return {customer: {}, status: 0};
    default:
      return state;
  }
};
