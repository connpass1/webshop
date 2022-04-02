import {combineReducers} from "redux";
import {cartReducer} from "./storeCart";

import {profileReducer} from "./storeUser";

export const reducer=combineReducers({
    profileReducer: profileReducer,
    cartReducer: cartReducer,

});

