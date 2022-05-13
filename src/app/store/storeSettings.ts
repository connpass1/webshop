import { Reducer } from "redux";
import { IFetchSettings } from "../models/IFaces";

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
      console.log(action.data);
      return { settings: action.data, status: 200 };
    case ActionTypesSettings.settingsRequest:
      return { settings: undefined, status: 100 };
    case ActionTypesSettings.errorSettings:
      return { settings: undefined, status: action.status };
    default :
      return state;
  }
};