import {call, put, takeEvery} from "redux-saga/effects";
import {actions, ActionTypes} from "./store";
import axios from 'axios'
export function getErrorStatus(e: any) {
  try {
    return e.response.status
  }
  catch (e) {return 500}

}

function* getCustomer() {
  try {
    const {data}=yield call(axios.get, 'http://localhost:3000/json/catalog.json')
    yield put(actions.getCustomerSuccess(data))
  } catch (e) {

    yield put(actions.CustomerRequestFiled(getErrorStatus(e)))
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

function* watchGetCustomerRequest() {
  yield takeEvery(ActionTypes.GetCustomerRequest, getCustomer);
  yield takeEvery(ActionTypes.GetItemsRequest, getItems);
}

export {watchGetCustomerRequest};
