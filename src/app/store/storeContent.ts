import { Reducer } from "redux";
import { IFetchContent } from "../models/IFaces";

export enum ActionTypesContent {
 
  getContent = "GET_CONTENT_REQUEST",
  delContent = "DELETE_CONTENT_REQUEST",
  saveContent = "SAVE_CONTENT_REQUEST",
  saveContentSuccess = "SAVE_CONTENT_SUCCESS",
  delContentSuccess = "DELETE_CONTENT_SUCCESS",
  getContentSuccess = "GET_CONTENT_SUCCESS",
  delContentFiled = "DELETE_CONTENT_FILED",
  getContentFiled = "GET_CONTENT_FILED",
  saveContentFiled = "SAVE_CONTENT_FILED",
}

export const actionsContent = {
   
  contentRequest: (url: string) => ({ type: ActionTypesContent.getContent, url }),
  delContentRequest: (data: any) => ({ type: ActionTypesContent.delContent, data }),
  saveContentRequest: (data: any) => ({ type: ActionTypesContent.saveContent, data }),

  getContentSuccess: (content: any) => ({ type: ActionTypesContent.getContentSuccess, content }),
  delContentSuccess: (status: number) => ({ type: ActionTypesContent.delContentSuccess, status }),
  saveContentSuccess: (content: any) => ({ type: ActionTypesContent.saveContentSuccess, content }),

  getContentFiled: (status: number) => ({ type: ActionTypesContent.getContentFiled, status }),
  delContentFiled: (status: number) => ({ type: ActionTypesContent.delContentFiled, status }),
  saveContentFiled: (status: number) => ({ type: ActionTypesContent.saveContentFiled, status })
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
    case ActionTypesContent.delContent:
    case ActionTypesContent.getContent:
      case ActionTypesContent.getContent:
      state = {
        content: undefined,
        status: 100
      };
      return { ...state };
    case ActionTypesContent.getContentSuccess:
      state = {
        content: action.content,
        status: 200
      };
      return { ...state };

    case ActionTypesContent.saveContentSuccess:
      state = {
        content: action.content,
        status: 201
      };
      return { ...state };
    case ActionTypesContent.getContentFiled:
      state = {
        content: undefined,
        status: action.status
      };
      return { ...state };
    case ActionTypesContent.delContentSuccess:
    case ActionTypesContent.delContentFiled:
    case ActionTypesContent.saveContentFiled:

      state = {
        content: state.content,
        status: action.status
      };


      return { ...state };
    default:
      return state;
  }
};
