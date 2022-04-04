import {Reducer} from "redux";
import {IFetchMessage} from "./Models";

export enum ActionTypesMessage {
  adMessage="adMessage",
  clearMessage="clearMessage",
  adMessageRequest="adMessageRequestee",
}
export const actionsMessage={
  adMessageRequest: (message: string) => ({type: ActionTypesMessage.adMessageRequest, message}),
  adMessage: (message: string) => ({type: ActionTypesMessage.adMessage, message}),
  clearMessage: () => ({type: ActionTypesMessage.clearMessage})

};

export const messageReducer: Reducer<any>=(
  state: IFetchMessage={
    message: "",
    fetching: false,
    errorFetching: -1
  },
  action: any
) => {


  switch (action.type) {

    case ActionTypesMessage.adMessageRequest:
      state={
        message: state.message,
        fetching: true,
        errorFetching: 0
      }
      return {...state}
    case ActionTypesMessage.adMessage:
      state={
        message: JSON.stringify(action.message),
        fetching: false,
        errorFetching: 0
      }
      return {...state}
    case ActionTypesMessage.clearMessage:
      state={
        message: "",
        fetching: false,
        errorFetching: -1
      }

      return {...state}
    default:
      return state;
  }
}
