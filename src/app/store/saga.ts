

import {call, put, takeEvery} from "redux-saga/effects";
import {actions, ActionTypes} from "./store";
import axios from 'axios'
import {ICustomer} from './Models';
export function getErrorStatus(e: any) {
  try {
    return e.response.status
  }
  catch (e) {return 500}
}

function* getCustomer() {
  try {
    const {data}=yield call(axios.get, 'http://localhost:3000/json/user.json')
    yield put(actions.getCustomerSuccess(data))
  } catch (e) {
    yield put(actions.CustomerRequestFiled(getErrorStatus(e)))
  }
}

function* getItems() {
  try {
    // eslint-disable-next-line 
    const {data}=yield call(axios.get, 'http://localhost:3000/json/catalog/0.json')
    yield put(actions.getItemsSuccess(data))
  } catch (e) {
    yield put(actions.ItemsRequestFiled(getErrorStatus(e)))
  }
}

function* saveProfile(profile: ICustomer) {
  try {
    // eslint-disable-next-line 
    const {data}=yield call(axios.post, 'http://localhost:3000/json/catalog/0.json', profile)
    console.log(JSON.stringify(profile));

    yield put(actions.saveProfileSuccess(profile))
  } catch (e) {
    yield put(actions.saveProfileFiled(getErrorStatus(e)))
    console.log(JSON.stringify(e));
  }
}

function* watchGetCustomerRequest() {
  yield takeEvery(ActionTypes.GetCustomerRequest, getCustomer);
  yield takeEvery(ActionTypes.GetItemsRequest, getItems);
  // yield takeEvery(ActionTypes.saveProfileRequest,saveProfile );
}

export {watchGetCustomerRequest};
