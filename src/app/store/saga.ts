import {call, delay, put, takeEvery} from "redux-saga/effects";
import {actionsUser, ActionTypesLogin} from "./storeUser";
import axios from 'axios'

import {getErrorStatus} from "./helper";

import {actionsMessage, ActionTypesMessage} from './storeMessage';

function* loginUser(userNameAndPass: any) {
  try {
    const {data}=yield call(axios.post, 'http://localhost:8080/user/login', userNameAndPass)
    console.log(JSON.stringify(userNameAndPass));
    yield delay(1500)
    if (data===null) yield put(actionsUser.loginFiled(404))
    else yield put(actionsUser.getLoginSuccess(data))

  } catch (e) {

    yield put(actionsUser.loginFiled(getErrorStatus(e)))
  }
}
function* registrationUser(userNameAndPass: any) {
  try {
    const {data}=yield call(axios.post, 'http://localhost:8080/user/reg', userNameAndPass)
    yield delay(1500)
    yield put(actionsUser.getLoginSuccess(data))

  } catch (e) {
    console.log('erroor,  http://localhost:8080/user/login ');
    yield put(actionsUser.loginFiled(getErrorStatus(e)))

  }
}


function* logoutUser() {
  try {
    yield call(axios.get, 'http://localhost:8080/user/logout')
    yield delay(1500)
    yield put(actionsUser.logoutSuccess())
  } catch (e) {
    yield put(actionsUser.logoutFiled(getErrorStatus(e)))
  }
}



function* watchUserRequest() {
  yield takeEvery(ActionTypesLogin.loginRequest, loginUser);
  yield takeEvery(ActionTypesLogin.logoutRequest, logoutUser);
  yield takeEvery(ActionTypesLogin.registrationRequest, registrationUser);



}

export {watchUserRequest};

