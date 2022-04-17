import React, {  useEffect } from "react";
import { connect } from "react-redux";
import { mapContent, PropsContent } from "../store/helper";
import { actionsContent } from "../store/storeContent";
import { useLocation } from "react-router-dom";
import { Icon } from "../components/Elements/Icon";

const Component: React.FC<PropsContent> = (props) => {
  const location = useLocation();

  useEffect(() => {
      const contentRequest = ( ) => {
        props.contentRequest(location.pathname);
      }
      return contentRequest( );
    }
    , [location]);// eslint-disable-line react-hooks/exhaustive-deps

  if (!props.content) return null;
  const { icon, title, content } = props.content;
  return <>

    <h1><Icon src={icon} /> {title}</h1>
    <div dangerouslySetInnerHTML={{ __html: `<div>${content}</div>` }}></div>

  </>;
};

const connected = connect(mapContent, actionsContent)(Component);
export default connected;