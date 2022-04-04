import {combineReducers} from "redux";
import {cartReducer} from "./storeCart";
import {messageReducer} from "./storeMessage";
import {profileReducer} from "./storeUser";

export const reducer=combineReducers({
    profileReducer: profileReducer,
    cartReducer: cartReducer,
    messageReducer: messageReducer
});

