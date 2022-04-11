import {combineReducers} from "redux";
import {cartReducer} from "./storeCart";
import {messageReducer} from "./storeMessage";
import {profileReducer} from "./storeUser";
import { contentReducer } from "./storeContent";

export const reducer=combineReducers({
    profileReducer: profileReducer,
    cartReducer: cartReducer,
    messageReducer: messageReducer,
    contentReducer: contentReducer,

});

