import React from "react";
import { connect } from "react-redux";
import { H1 } from "../components/Elements/Icon";
import { MainStart } from "../components/Elements/Styled";
import { ArticleModel } from "../models/ArticleModel";
import { mapContent, PropsContent, useFetchLocation } from "../store/helper";
import { actionsContent } from "../store/storeContent";

const Component: React.FC<any> = (props) => {
  const model: ArticleModel = new ArticleModel(props);
  return (
    <>
      <H1 src={model.icon}> {model.title}</H1>
      <MainStart>{model.content && <div dangerouslySetInnerHTML={{ __html: model.content }} />}</MainStart>
    </>
  );
};

const Component1: React.FC<PropsContent> = (props) => {
  useFetchLocation(props.contentRequest);
  if (props.status < 200) return null;
  if (!props.content) return null;
  return <Component {...props.content} />;
};
const FetchContent = connect(mapContent, actionsContent)(Component1);
export default FetchContent;
