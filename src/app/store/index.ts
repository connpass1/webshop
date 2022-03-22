import {combineReducers} from "redux";
import {itemReducer} from "./storeItem";
import {profileReducer} from "./storeProfile";

export const reducer=combineReducers({
    profileReducer: profileReducer,
    itemReducer: itemReducer,

});

