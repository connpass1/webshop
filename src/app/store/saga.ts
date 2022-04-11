import {call, delay, put, takeEvery} from "redux-saga/effects";
import {actionsUser, ActionTypesLogin} from "./storeUser";
import axios from 'axios'
import {getErrorStatus} from "./helper";
import {actionsCart, ActionTypesCart} from "./storeCart";
import { actionsContent, ActionTypesContent } from "./storeContent";
import { SERVERNAME } from "../components/hooks";


function* loginUser(userNameAndPass: any) {
  try {
    const {data}=yield call(axios.post, SERVERNAME+'/user/login', userNameAndPass)

    yield delay(1500)
    if (data===null) yield put(actionsUser.loginFiled(404))
    else yield put(actionsUser.getLoginSuccess(data))
  } catch (e) {
    yield put(actionsUser.loginFiled(getErrorStatus(e)))
  }
}
function* registrationUser(userNameAndPass: any) {
  try {
    const {data}=yield call(axios.post, SERVERNAME+'/user/reg', userNameAndPass)

    yield put(actionsUser.getLoginSuccess(data))

  } catch (e) {

    yield put(actionsUser.loginFiled(getErrorStatus(e)))

  }
}
function* logoutUser() {
  try {
   // yield call(axios.get, 'http://localhost:8080/user/logout')

    yield put(actionsUser.logoutSuccess())
  } catch (e) {
    yield put(actionsUser.logoutFiled(getErrorStatus(e)))
  }
}
function* makeOrder(orderData: any) {
  try {
    //console.log(JSON.stringify(orderData));
    const  {data} =yield call(axios.post,  SERVERNAME+'/order/'+orderData.items.userId, orderData.items.items)
    //yield delay(1500)
     //console.log(data);

    yield put(actionsCart.makeOrderSuccess(data  ));

    //console.log("makeOrder    " +JSON.stringify(data));

  } catch (e) {
    console.log("makeOrder"+e);
    yield put(actionsCart.makeOrderERROR(getErrorStatus(e)))
  }
}
function* getContent(p : any) {
  try {
    console.log(JSON.stringify(p.url));
    const {data}=yield call(axios.get, SERVERNAME+ p.url )
       yield delay(2500)
   // console.log(JSON.stringify(data));
     if (!data  ) yield put(actionsContent.contentFiled(404))
    else yield put(actionsContent.contentSuccess(data))

  } catch (e) {
    yield put(actionsContent.contentFiled(getErrorStatus(e)))
    console.log(  JSON.stringify(e));
  }
}

function* watchUserRequest() {
  yield takeEvery(ActionTypesLogin.loginRequest, loginUser);
  yield takeEvery(ActionTypesLogin.logoutRequest, logoutUser);
  yield takeEvery(ActionTypesLogin.registrationRequest, registrationUser);
  yield takeEvery(ActionTypesCart.makeOrderRequest, makeOrder);
  yield takeEvery(ActionTypesContent.contentRequest, getContent);
}

export {watchUserRequest};

