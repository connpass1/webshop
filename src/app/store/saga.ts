import {call, put, takeEvery} from "redux-saga/effects";
import {actions, ActionTypes} from "./store";
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
    const {data}=yield call(axios.get, 'http://localhost:3000/json/user.json')

    yield put(actions.getPersonSuccess(data))
  } catch (e) {
    yield put(actions.personRequestFiled(getStatus(e)))
  }
}

function* getItems() {
  try {
    const {data}=yield call(axios.get, 'http://localhost:3000/json/catalog.json')
    yield put(actions.getItemsSuccess(data))
  } catch (e) {
    yield put(actions.ItemsRequestFiled(getStatus(e)))
  }
}

function* watchGetPersonRequest() {
  yield takeEvery(ActionTypes.GetPersonRequest, getPerson);
  yield takeEvery(ActionTypes.GetItemsRequest, getItems);
}

export {watchGetPersonRequest};
