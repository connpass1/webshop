
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
};
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

    default:

      return state;
  }
};
export const reducer=fetchReducer 