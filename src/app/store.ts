
import {Reducer} from "redux";

interface IPersonDto {
  id: number;
  name: string;
  age: number;
}

export enum ActionTypes {
  GetPersonRequest="GET_PERSON_REQUEST",
  GetPersonSuccess="GET_PERSON_SUCCESS",
  PersonRequestFiled="PERSON_REQUEST_FAILED",
  GetItemsRequest="GET_ITEMS_REQUEST",
  GetItemsSuccess="GET_ITEMS_SUCCESS",
  ItemsRequestFiled="ITEMS_REQUEST_FAILED",
}

export const actions={
  getPersonRequest: () => ({type: ActionTypes.GetPersonRequest}),

  getPersonSuccess: (person: IPersonDto) => ({
    type: ActionTypes.GetPersonSuccess,
    person
  }),
  personRequestFiled: (error: string) => ({
    type: ActionTypes.PersonRequestFiled, error

  }),
  getItemsRequest: () => ({type: ActionTypes.GetItemsRequest}),

  getItemsSuccess: (items: IPersonDto) => ({
    type: ActionTypes.GetItemsSuccess,
    items
  }),
  ItemsRequestFiled: (error: string) => ({
    type: ActionTypes.ItemsRequestFiled, error

  }),



};
export interface IStateItems {
  fetchingItems?: boolean;
  items?: IPersonDto;
  errorFetchingItems?: any
}
export interface IStatePerson {
  fetchingPerson?: boolean;
  person?: IPersonDto;
  errorFetchingPerson?: any
}
const fetchReducer: Reducer<any>=(
  state={},
  action: any,
): IStatePerson => {
  switch (action.type) {
    case ActionTypes.GetPersonRequest:
      delete state.errorFetchingPerson;
      delete state.person;
      return {...state, fetchingPerson: true};
    case ActionTypes.GetPersonSuccess:
      delete state.fetchingPerson;
      return {...state, person: action.person};
    case ActionTypes.PersonRequestFiled:
      delete state.fetchingPerson;
      delete state.person;
      return {
        ...state, errorFetchingPerson: action.error
      };
    // items
    case ActionTypes.GetItemsRequest:
      delete state.errorItemsPerson;
      delete state.items;
      return {...state, fetchingItems: true};
    case ActionTypes.GetItemsSuccess:
      delete state.fetchingItems;
      return {...state, items: action.items};
    case ActionTypes.ItemsRequestFiled:
      delete state.fetchingItems;
      delete state.items;
      return {
        ...state, errorFetchingItems: action.error
      };

    //

    default:

      return state;
  }
};
export const reducer=fetchReducer 