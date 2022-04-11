import { call, delay, put, takeEvery } from "redux-saga/effects";
import { actionsUser, ActionTypesLogin } from "./storeUser";
import axios from "axios";
import { getErrorStatus } from "./helper";
import { actionsCart, ActionTypesCart } from "./storeCart";
import { actionsContent, ActionTypesContent } from "./storeContent";
import { CUSTOMER, SERVERNAME, TokenPREFIX } from "../data";
import { actionsSettings, ActionTypesSettings } from "./storeSettings";
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
    yield delay(1500);
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
    const response = yield call(axios.post, SERVERNAME + "/register", userNameAndPass);
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
    //console.log(JSON.stringify(orderData));
    const { data } = yield call(axios.post, SERVERNAME + "/order", orderData.items.items, { headers: headerParams() });
    //yield delay(1500)
    //console.log(data);
    yield put(actionsCart.makeOrderSuccess(data));
    //console.log("makeOrder    " +JSON.stringify(data));
  } catch (e) {
    console.log("makeOrder" + e);
    yield put(actionsCart.makeOrderERROR(getErrorStatus(e)));
  }
}
function* getContent(dataContent: any) {
  try {
    const { data } = yield call(axios.get, SERVERNAME + dataContent.url, { headers: headerParams() });
    // yield delay(2500)
    console.log(JSON.stringify(data));
    if (!data) yield put(actionsContent.contentFiled(404));
    else yield put(actionsContent.contentSuccess(data));
  } catch (e) {
    yield put(actionsContent.contentFiled(getErrorStatus(e)));
    console.log(JSON.stringify(e));
  }
}
function* getSettings( ) {
  try {
    const { data } = yield call(axios.get, SERVERNAME + "/settngs", { headers: headerParams() });

    if (!data) yield put(actionsSettings.initSettings(data));

    else yield put(actionsSettings.errorSettings(404));
  } catch (e) {
    yield put(actionsSettings.errorSettings(getErrorStatus(e)));
    console.log(JSON.stringify(e));
  }
}

function* setContent(dataContent: any) {
  try {
    //console.log(JSON.stringify(dataContent));
    const url = SERVERNAME + dataContent.data.url;
    console.log(url);
    console.log("----------------------------------");
    const content = dataContent.data.data;
    console.log(content);
    console.log("----------------------------------");
    const { data } = yield call(axios.post, url, content, {
      headers: headerParams()
    });
    //
    console.log(JSON.stringify(data));
    if (!data) yield put(actionsContent.contentFiled(404));
    else yield put(actionsContent.contentSuccess(data));
  } catch (e) {
    yield put(actionsContent.contentFiled(getErrorStatus(e)));
    console.log(JSON.stringify(e));
  }
}
function* watchUserRequest() {
  yield takeEvery(ActionTypesLogin.loginRequest, loginUser);
  yield takeEvery(ActionTypesLogin.logoutRequest, logoutUser);
  yield takeEvery(ActionTypesLogin.registrationRequest, registrationUser);
  yield takeEvery(ActionTypesCart.makeOrderRequest, makeOrder);
  yield takeEvery(ActionTypesContent.contentRequest, getContent);
  yield takeEvery(ActionTypesContent.saveContentRequest, setContent);
  yield takeEvery(ActionTypesSettings.initSettings, getSettings);
}
export { watchUserRequest };
