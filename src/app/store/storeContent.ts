import { Reducer } from "redux";
import { IFetchContent } from "../models/IFases";

export enum ActionTypesContent {
  contentRequest = "CONTENT_REQUEST",
  saveContentRequest = "SAVE_CONTENT_REQUEST",
  contentSuccess = "CONTENT_SUCCESS",
  contentFiled = "CONTENT_FILED",
}

export const actionsContent = {
  contentRequest: (url: string) => ({ type: ActionTypesContent.contentRequest, url }),
  contentSuccess: (data: any) => ({ type: ActionTypesContent.contentSuccess, data }),
  contentFiled: (status: number) => ({ type: ActionTypesContent.contentFiled, status }),
  saveContentRequest: (data: any) => ({ type: ActionTypesContent.saveContentRequest, data })
};
// @ts-ignore
export const contentReducer: Reducer<any> = (
  state: IFetchContent = {
    content: undefined,
    status: 200
  },
  action: any
) => {
  switch (action.type) {
    case ActionTypesContent.contentRequest:
    case ActionTypesContent.saveContentRequest:
      state = {
        content: undefined,
        status: 100
      };
      return { ...state };
    case ActionTypesContent.contentSuccess:
      state = {
        content: action.data,
        status: 200
      };
      return { ...state };
    case ActionTypesContent.contentFiled:
      state = {
        content: undefined,
        status: action.status
      };
      return { ...state };
    default:
      return state;
  }
};
