import {call, put, takeEvery} from "redux-saga/effects";
import {actions, ActionTypes} from "../store";
import axios from 'axios'

export interface IError {
  message: string;
}
function getStatus(param: any) {
  try {
    const status=JSON.parse(JSON.stringify(param)).status
    if (Number.isInteger(status)) return status
    return 0
  }
  catch (e) {return 0}
}



function* getPerson() {
  try {
    const {data}=yield call(axios.get, 'http://localhost:3000/json/user1.json')
    const isMale=data.sex===1; // This property doesn't exist on IPersonDto, but no error.
    const isOld=data.age>=30||isMale;
    yield put(actions.getPersonSuccess(data))
  } catch (e) {
    yield put(actions.personRequestFiled(getStatus(e)))
  }
}
function* watchGetPersonRequest() {
  yield takeEvery(ActionTypes.GetPersonRequest, getPerson);
}

export {watchGetPersonRequest};
