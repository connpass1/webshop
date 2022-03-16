import {call, put, takeEvery} from "redux-saga/effects";
import {actions, ActionTypes} from "./store";
import axios from 'axios'
export function getErrorStatus(e: any) {
  try {
    return e.response.status
  }
  catch (e) {return 500}

}

function* getPerson() {
  try {
    const {data}=yield call(axios.get, 'http://localhost:3000/json/catalog.json')
    yield put(actions.getPersonSuccess(data))
  } catch (e) {

    yield put(actions.personRequestFiled(getErrorStatus(e)))
  }
}

function* getItems() {
  try {
    const {data}=yield call(axios.get, 'http://localhost:3000/json/catalog.json')
    yield put(actions.getItemsSuccess(data))
  } catch (e) {


    yield put(actions.ItemsRequestFiled(getErrorStatus(e)))
  }
}

function* watchGetPersonRequest() {
  yield takeEvery(ActionTypes.GetPersonRequest, getPerson);
  yield takeEvery(ActionTypes.GetItemsRequest, getItems);
}

export {watchGetPersonRequest};
