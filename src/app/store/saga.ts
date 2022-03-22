import {call, delay, put, takeEvery} from "redux-saga/effects";
import {actionsProfile} from "./storeProfile";
import axios from 'axios'
import {actionsItems} from "./storeItem";
import {getErrorStatus} from "./helper";
import {ICustomer} from './Models';

function* getCustomer() {
  try {
    const {data}=yield call(axios.get, 'http://localhost:3000/json/user.json')
    yield delay(1500)
    yield put(actionsProfile.getProfileSuccess(data))
  } catch (e) {
    yield put(actionsProfile.saveProfileFiled(getErrorStatus(e)))
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

    const {data}=yield call(axios.get, 'http://localhost:3000/json/catalog/0.json')
    yield delay(1500)
    console.log(data+"hhhh")
    yield put(actionsItems.getItemsSuccess(data))
  } catch (e) {
    yield put(actionsItems.ItemsRequestFiled(getErrorStatus(e)))
  }
}

function* saveProfile(data: any) {

  try {

    //  const {data}=yield call(axios.post, 'http://localhost:3000/json/catalog/0.json')

    yield delay(1500)
    yield put(actionsProfile.saveProfileSuccess(data.profile as ICustomer))

  } catch (e) {
    yield put(actionsProfile.saveProfileFiled(getErrorStatus(e)))
    console.log(JSON.stringify(e));
  }
}

function* watchGetCustomerRequest() {
  yield takeEvery(ActionTypes.GetCustomerRequest, getCustomer);
  yield takeEvery(ActionTypes.GetItemsRequest, getItems);
  yield takeEvery(ActionTypes.SaveProfileRequest, saveProfile);
}

export {watchGetCustomerRequest};
