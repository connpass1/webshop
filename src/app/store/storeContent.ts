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
    status: 200,
    url:""
  },
  action: any
) => {
  console.log(action);
  
  switch (action.type) {
    case ActionTypesContent.delContent:
    case ActionTypesContent.getContent:
      case ActionTypesContent.saveContent: 
      return { content:state.content,
        status: 100,url: action.url};
    case ActionTypesContent.getContentSuccess:
      
      return {
        content: action.content,
        status: 200,
        url:state.url
      };;

    case ActionTypesContent.saveContentSuccess:
      return {
        content: action.content,
        status: 201,
        url:state.url,
      };
     
    case ActionTypesContent.getContentFiled:
      return {
        content: undefined,
        status: action.status,
        url:state.url
      };
       
    case ActionTypesContent.delContentSuccess:
    case ActionTypesContent.delContentFiled:
    case ActionTypesContent.saveContentFiled: 
      return {
        content: action.content,
        status: action.status,
        url:state.url,
      }; 
     
    default:
      return state;
  }
};
