import {call, put, takeEvery} from "redux-saga/effects";

import {actions, ActionTypes} from "../store";
import axios from 'axios'

export interface IError {
  message: string;

}
function* getPerson() {
  try {
    const {data}=yield call(axios.get, 'http://localhost:3000/json/user.json')
    const isMale=data.sex===1; // This property doesn't exist on IPersonDto, but no error.
    const isOld=data.age>=30||isMale;
    yield put(actions.getPersonSuccess(data, isOld))
  } catch (e) {
    const dto={
      id: 4,
      name: "error",
      age: 45,
    }
    yield put(actions.getPersonSuccess(dto, false))
  }
}
function* watchGetPersonRequest() {
  yield takeEvery(ActionTypes.GetPersonRequest, getPerson);
}

export {watchGetPersonRequest};
