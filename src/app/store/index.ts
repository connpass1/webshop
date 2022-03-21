import {combineReducers} from "redux";
import {itemReducer, profileReducer} from "./storeProfile";

export const reducer=combineReducers({
    profileReducer: profileReducer,
    itemReducer: itemReducer,

});

