import {Reducer} from "redux";
import {IFetchMessage} from "./Models";

export enum ActionTypesMessage {
  adMessage="adMessage",
  clearMessage="clearMessage",
  adMessageRequest="adMessageRequest",
}
export const actionsMessage={
  adMessageRequest: (message: string) => ({type: ActionTypesMessage.adMessageRequest, message}),
  adMessage: (message: string) => ({type: ActionTypesMessage.adMessage, message}),
  clearMessage: () => ({type: ActionTypesMessage.clearMessage})

};

export const messageReducer: Reducer<any>=(
  state: IFetchMessage={
    message: "",
    status: 0
  },
  action: any
) => {


  switch (action.type) {
    case ActionTypesMessage.adMessageRequest:
      state={
        message: state.message,
        status: 0
      }
      return {...state}
    case ActionTypesMessage.adMessage:
      state={
        message: JSON.stringify(action.message),
        status: 0
      }
      return {...state}
    case ActionTypesMessage.clearMessage:
      state={
        message: "",
        status: 0

      }

      return {...state}
    default:
      return state;
  }
}
