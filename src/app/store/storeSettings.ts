import { Reducer } from "redux";
import { IFetchCustomer, IFetchMessage, IFetchSettings } from "../models/IFases";
import { initCustomer, saveToLocalStorage, UserModel } from "../models/UserModel";
import { ActionTypesLogin } from "./storeUser";
import { SettingModel } from "../models/SettingModel";
export enum ActionTypesSettings {
  initSettings = "ADD_SETTINGS",
  errorSettings = "ERROR_SETTINGS",
  settingsRequest = "SETTINGS_REQUEST",
}
export const actionsSettings = {
  initSettings: (data: any) => ({ type: ActionTypesSettings.initSettings, data }),
  errorSettings: (status: number) => ({ type: ActionTypesSettings.errorSettings, status }),
  settingsRequest: () => ({ type: ActionTypesSettings.settingsRequest })
};
export const settingsReducer: Reducer = (
  state: IFetchSettings = { settings: undefined, status: 100 },
  action
): IFetchSettings => {
  switch (action.type) {
    case ActionTypesSettings.initSettings:
      return { settings: new SettingModel( action.data.settings ), status: 100 };

    case ActionTypesSettings.settingsRequest:
      return { settings: undefined, status: 100 };
    case ActionTypesSettings.errorSettings:
    return { settings: undefined, status: action.status };
    default : return state;
  }
};