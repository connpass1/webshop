import React, { useEffect } from "react";
import { connect } from "react-redux";
import { mapContent } from "../store/helper";
import { actionsContent } from "../store/storeContent";
import { useLocation } from "react-router-dom";
import { Icon } from "../components/Elements/Icon";
type Props = ReturnType<typeof mapContent> & typeof actionsContent;
const Component: React.FC<Props> = (props) => {
  const location = useLocation();
  console.log(location.pathname);
  useEffect(() => {
      props.contentRequest(location.pathname);
    }
    , [location]);
  if (!props.content) return null;
  const { icon,title,content}=props.content
  return <>  {JSON.stringify(props.content)}
    <header><Icon src={icon} />
      <h1> {title}</h1></header>
    <div dangerouslySetInnerHTML={{__html: `<div>${content}</div>`}}></div>
   
</>;
};
const connected = connect(mapContent, actionsContent)(Component);
export default connected;