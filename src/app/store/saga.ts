

import {call, put, takeEvery} from "redux-saga/effects";
import {actionsProfile} from "./storeProfile";
import axios from 'axios'
import {actionsItems} from "./storeItem";

export function getErrorStatus(e: any) {
  try {
    return e.response.status
  }
  catch (e) {return 500}
}

function* getCustomer() {
  try {
    const {data}=yield call(axios.get, 'http://localhost:3000/json/user.json')
    yield put(actionsProfile.getSuccess(data))
  } catch (e) {
    yield put(actionsProfile.RequestFiled(getErrorStatus(e)))
  }
}
export enum ActionTypes {
  GetCustomerRequest="GET_CUSTOMER_REQUEST",
  GetCustomerSuccess="GET_CUSTOMER_SUCCESS",
  CustomerRequestFiled="CUSTOMER_REQUEST_FAILED",
  GetItemsRequest="GET_ITEMS_REQUEST",
  GetItemsSuccess="GET_ITEMS_SUCCESS",
  ItemsRequestFiled="ITEMS_REQUEST_FAILED",
  SaveProfileRequest="SAVE_PROFILE_Request",
  SaveProfileSuccess="SAVE_PROFILE_SUCCESS",
  SaveProfileFiled="SAVE_PROFILE_FAILED",

}
function* getItems() {
  try {
    // eslint-disable-next-line 
    const {data}=yield call(axios.get, 'http://localhost:3000/json/catalog/0.json')
    yield put(actionsItems.getItemsSuccess(data))
  } catch (e) {
    yield put(actionsItems.ItemsRequestFiled(getErrorStatus(e)))
  }
}

function* saveProfile() {
  try {
    // eslint-disable-next-line 
    const {data}=yield call(axios.post, 'http://localhost:3000/json/catalog/0.json')
    //console.log(JSON.stringify(profile));
    //profile
    yield put(actionsProfile.saveSuccess(data))
  } catch (e) {
    yield put(actionsProfile.saveFiled(getErrorStatus(e)))
    console.log(JSON.stringify(e));
  }
}

function* watchGetCustomerRequest() {
  yield takeEvery(ActionTypes.GetCustomerRequest, getCustomer);
  yield takeEvery(ActionTypes.GetItemsRequest, getItems);
  yield takeEvery(ActionTypes.SaveProfileRequest, saveProfile);
}

export {watchGetCustomerRequest};
