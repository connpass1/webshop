import React, { useEffect } from "react";
import { connect } from "react-redux";
import { mapContent } from "../store/helper";
import { actionsContent } from "../store/storeContent";
import { Route, useLocation } from "react-router-dom";
import { CheckFetching } from "../components/Fetching";

import Catalog from "../pages/CatalogPage";
import ItemDetailPage from "../pages/ItemDetailPage";


const Component : React.FC = (props) => {
  const location = useLocation();

  return  <>
   PageRouter

      {location.pathname}
    </>
};


export default Component;