import axios, { AxiosResponse } from "axios";
import { call, put, takeEvery } from "redux-saga/effects";
import { CUSTOMER } from "../models/UserModel";
import { getErrorStatus } from "./helper";
import { actionsCart, ActionTypesCart } from "./storeCart";
import { actionsContent, ActionTypesContent } from "./storeContent";
import { actionsSettings, ActionTypesSettings } from "./storeSettings";
import { actionsUser, ActionTypesLogin } from "./storeUser";

export const SERVERNAME = "http://192.168.1.125:8080";
export const TokenPREFIX = "WebShop";
const headerParams = () => {
  const lc = localStorage.getItem(CUSTOMER);
  if (!lc) return undefined;
  const token = JSON.parse(lc).token;
  if (!token) return undefined;
  return {
    "Authorization": `${TokenPREFIX}${token}`
  };
};

function* loginUser(userNameAndPass: any) {
  try {
    delete userNameAndPass.type;
    const { data } = yield call(axios.post, SERVERNAME + "/login", userNameAndPass);
    if (data === null) yield put(actionsUser.loginFiled(404));
    console.log(data);
    yield put(actionsUser.getLoginSuccess(data));
  } catch (e) {
    console.log(e);
    yield put(actionsUser.loginFiled(getErrorStatus(e)));
  }
}

function* registrationUser(userNameAndPass: any) {

  try {
  
    const response:AxiosResponse   = yield call(axios.post, SERVERNAME + "/register", userNameAndPass);
     
    console.log(response);
    if (response.status === 200) {
      yield put(actionsUser.loginUserRequest(userNameAndPass.name, userNameAndPass.password));
    } else yield put(actionsUser.loginFiled(response.status));
  } catch (e) {
    console.log(e);
    yield put(actionsUser.loginFiled(getErrorStatus(e)));
  }
}

function* logoutUser() {
  try {
    yield put(actionsUser.logoutSuccess());
  } catch (e) {
    yield put(actionsUser.logoutFiled(getErrorStatus(e)));
  }
}

function* makeOrder(orderData: any) {
  try {
    const { data } = yield call(axios.post, SERVERNAME + "/order", orderData.items.items, { headers: headerParams() });
    yield put(actionsCart.makeOrderSuccess(data));
  } catch (e) {
    yield put(actionsCart.makeOrderERROR(getErrorStatus(e)));
  }
}

function* getContent(dataContent: any) {
  yield put(actionsContent.contentGet());
  try {
    console.log(dataContent.url);
    const { data } = yield call(axios.get, SERVERNAME + dataContent.url, { headers: headerParams() });
    console.log(data);
    if (!data) yield put(actionsContent.getContentFiled(404));
    else yield put(actionsContent.getContentSuccess(data));
  } catch (e) {
    yield put(actionsContent.getContentFiled(getErrorStatus(e)));
  }
}

function* getSettings() {

  try {
    const { data } = yield call(axios.get, SERVERNAME + "/settings" ,  { headers: headerParams() });
    yield put(actionsSettings.initSettings( data));

  } catch (e) {
    console.log(e);
    yield put(actionsSettings.errorSettings(getErrorStatus(e)));
    console.log(JSON.stringify(e));
  }
}

function* saveContent(dataContent: any) {
  yield put(actionsContent.contentGet());
  try {
    //console.log(JSON.stringify(dataContent));

    const url = SERVERNAME + dataContent.data.url;

    console.log(url);
    console.log("-----------saveContent-------------------");
    const content = dataContent.data.data;
    console.log(content);
    console.log("------------saveContent----------------------");
    const { data, status } = yield call(axios.post, url, content, {
      headers: headerParams()
    });
    //
    console.log(status);
    console.log("---------------saveContent-------------");
    console.log(JSON.stringify(data));

    if (!data) yield put(actionsContent.saveContentFiled(301));
    else yield put(actionsContent.saveContentSuccess(data));
  } catch (e) {
    yield put(actionsContent.saveContentFiled(getErrorStatus(e)));
    console.log("---------------saveContent---еннн ----------");

    console.log(JSON.stringify(e));
  }
}

function* delContent(dataContent: any) {
  yield put(actionsContent.contentGet());
  try {
    //console.log(JSON.stringify(dataContent));
    const url = SERVERNAME + dataContent.data.url;
    console.log(url);
    const content = dataContent.data;
    console.log(content);
    console.log("----------delContent---------------");
    const { status } = yield call(axios.post, url, content, {
      headers: headerParams()
    });
    //
    console.log(status);
    console.log("----------delContent---------------");
    yield put(actionsContent.delContentSuccess(status));

  } catch (e) {
    yield put(actionsContent.delContentFiled(getErrorStatus(e)));
    console.log(JSON.stringify(e));
  }
}

function* watchUserRequest() {
  yield takeEvery(ActionTypesLogin.loginRequest, loginUser);
  yield takeEvery(ActionTypesLogin.logoutRequest, logoutUser);
  yield takeEvery(ActionTypesLogin.registrationRequest, registrationUser);
  yield takeEvery(ActionTypesCart.makeOrderRequest, makeOrder);
  yield takeEvery(ActionTypesContent.getContent, getContent);
  yield takeEvery(ActionTypesContent.saveContent, saveContent);
  yield takeEvery(ActionTypesSettings.settingsRequest, getSettings);
  yield takeEvery(ActionTypesContent.delContent, delContent);
}

export { watchUserRequest };

