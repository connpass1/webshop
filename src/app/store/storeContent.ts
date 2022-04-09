import {Reducer} from "redux";
import { IFetchContent } from "./Models";

export enum ActionTypesContent {

  contentRequest="Content_REQUEST",
  contentSuccess="Content_SUCCESS",
  contentFiled="Content_FILED",

}
export const actionsContent={
  contentRequest: (url: string) => ({type: ActionTypesContent.contentRequest, url}),
  contentSuccess: (data:any ) => ({type: ActionTypesContent.contentSuccess,data  }),
  contentFiled: (status:number) => ({type: ActionTypesContent.contentFiled,status})

};

// @ts-ignore
export const contentReducer: Reducer<any>=(
  state: IFetchContent ={
  content: undefined,
    status: 200
  },
  action: any
) => {

  switch (action.type) {
    case ActionTypesContent.contentRequest:
      state={
        content: undefined,
        status: 100
      }
      return {...state}
    case ActionTypesContent.contentSuccess:
      state={
        content:  action.data ,
        status: 200
      }
      return {...state}
    case ActionTypesContent.contentFiled:
      state={
        content: undefined,
        status: action.status
      }
      return {...state}
    default:
      return state;
  }
}
