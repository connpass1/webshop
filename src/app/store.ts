
import {Reducer} from "redux";
interface IPersonDto {
  id: number;
  name: string;
  age: number;
  error?: string
}

export enum ActionTypes {
  GetPersonRequest="GET_PERSON_REQUEST",
  GetPersonSuccess="GET_PERSON_SUCCESS",
  IsFetching="IS_FETCHING",
  isNavOpen="IS_NAV_OPEN",
  setNavOpen="SET_NAV_OPEN",
}

export const actions={
  getPersonRequest: () => ({type: ActionTypes.GetPersonRequest}),
  м: (person: IPersonDto, isOld: boolean) => ({
    type: ActionTypes.GetPersonSuccess,
    person,
    isOld
  }),
  getPersonSuccess: (person: IPersonDto, isOld: boolean) => ({
    type: ActionTypes.GetPersonSuccess,
    person,
    isOld
  }),
  isNavOpen: () => ({type: ActionTypes.isNavOpen}),
  setNavOpen: () => ({
    type: ActionTypes.setNavOpen
  }),
};
export interface IState {
  fetching?: boolean;
  person?: IPersonDto;
  isOld?: boolean;
  navbar?: boolean;
}

const fetchReducer: Reducer<IState>=(
  state={fetching: false, navbar: false},
  action: any
): IState => {
  switch (action.type) {
    case ActionTypes.GetPersonRequest:
      return {...state, fetching: true};
    case ActionTypes.GetPersonSuccess:
      return {...state, fetching: false, person: action.person, isOld: action.isOld};
    case ActionTypes.IsFetching:
      return {fetching: true};
    case actions.isNavOpen:
      return {navbar: state.navbar};
    case ActionTypes.setNavOpen:
      state={...state, navbar: !state.navbar};
      return state;
    default:
      return state;
  }
};
export const reducer=fetchReducer 