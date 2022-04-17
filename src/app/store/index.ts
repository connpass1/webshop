import { combineReducers } from "redux";
import { cartReducer } from "./storeCart";
import { settingsReducer } from "./storeSettings";
import { profileReducer } from "./storeUser";
import { contentReducer } from "./storeContent";

export const reducer = combineReducers({
  profileReducer: profileReducer,
  cartReducer: cartReducer,
  contentReducer: contentReducer,
  settingsReducer: settingsReducer
});
