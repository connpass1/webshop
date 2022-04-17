import React, { useEffect } from "react";
import { connect } from "react-redux";
import { mapContent } from "../store/helper";
import { actionsContent } from "../store/storeContent";
import { Route, useLocation } from "react-router-dom";
import Catalog from "../pages/CatalogPage";
import ItemDetailPage from "../pages/ItemDetailPage";
import { createGlobalStyle } from "styled-components";
import { device, theme } from "../components/GlobalStyles";

const CatalogStyles = createGlobalStyle`
  Section {
    display: grid;
    box-shadow: ${theme.shadow};
    color: ${theme.color.primary};
    font-size: 1rem;
    border-radius: 8px;
    align-items: center;
    gap: 12px;
    div {
      padding: 0 8px
    }
    header {
      text-align: center;
      display: inline-block;
      grid-area: h;
      border-radius: 8px 8px 0 0;
      color: white;
      background-color: ${theme.color.primary};
      margin: 0;
      padding: 8px;
      @media ${device.mobile} {
        box-sizing: content-box ;
        width: 100vw ;
        margin: 0 -10px ;
        border-radius: 0;
      }
    }

  }
  .price {
    grid-area: price;
    padding: 12px;
    font-size: 1.8em;
    :after {
      content: " р."
    }
  ;
  }
`;

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
      <CatalogStyles />
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