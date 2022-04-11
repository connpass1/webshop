import React, { useEffect } from "react";
import { connect } from "react-redux";
import { mapContent } from "../store/helper";
import { actionsContent } from "../store/storeContent";
import { Route, useLocation } from "react-router-dom";
import { CheckFetching } from "../components/Fetching";

import Catalog from "../pages/CatalogPage";
import ItemDetailPage from "../pages/ItemDetailPage";

type Props = ReturnType<typeof mapContent> & typeof actionsContent;
const Component1: React.FC<Props> = (props) => {
  const location = useLocation();
  console.log(location.pathname);
  useEffect(() => {
      props.contentRequest(location.pathname);
    }
    , [location]);
  return (
    <>
      {props.content && < >
        <Route exact path="/catalog/:id">
          <Catalog catalog={props.content} />
        </Route>
        <Route exact path="/item/:id">
          <ItemDetailPage detail={props.content} />
        </Route> </>}
    </>);
};

const connected = connect(mapContent, actionsContent)(Component1);
export default connected;