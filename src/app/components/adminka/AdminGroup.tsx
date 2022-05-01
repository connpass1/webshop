import React from "react";
import { connect } from "react-redux";
import { mapContent, PropsContent, useFetchLocation } from "../../store/helper";
import { actionsContent } from "../../store/storeContent";
import Pageable from "../Blocks/Pageable";
import { H1  } from "../Elements/Icon";


const Component: React.FC<any> = (props) => {


  return (
    <>
      {JSON.stringify(props)}
    </>
  );
};
const Component1: React.FC<PropsContent> = (props) => {
  useFetchLocation(props.contentRequest);
  const content = props.content;

  return (
    <>
      <H1 src={"list"}>Категории </H1>
      <main> {props.status > 199 && content && <Component {...content} />} </main>
      <Pageable pages={content?.totalPages} />
    </>
  );
};
const FetchContent = connect(mapContent, actionsContent)(Component1);
export default FetchContent;
