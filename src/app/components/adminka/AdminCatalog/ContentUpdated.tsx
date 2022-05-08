import { FunctionComponent, useEffect } from "react";
import { connect } from "react-redux";
import { mapSettings, PropsSetting } from "../../../store/helper";
import { actionsSettings, ActionTypesSettings } from "../../../store/storeSettings";

const Component: FunctionComponent<PropsSetting> = (props) => {
  useEffect(() => {
    function f(
      req: () => {
        type: ActionTypesSettings;
      }
    ) {
      req();
    }

    return f(props.settingsRequest); // eslint-disable-line react-hooks/exhaustive-deps
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return null;
};

const Connected = connect(mapSettings, actionsSettings)(Component);
export default Connected;
