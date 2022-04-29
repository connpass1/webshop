import { H1 } from "../components/Elements/Icon";
import { actionsContent } from "../store/storeContent";
import { mapContent, PropsContent, useFetchLocation } from "../store/helper";
import { connect } from "react-redux";
import React from "react";
import { ArticleContentModel } from "../models/ArticleModel";

const Component: React.FC<any> = (props) => {

  const model: ArticleContentModel = new ArticleContentModel(props);
  return <>
    <H1 src={model.article.icon}> {model.title}</H1>
    <main className={"start"}>
      {JSON.stringify(props)}
      <div dangerouslySetInnerHTML={{ __html: `<div>${model.content}</div>` }}></div>
    </main>
  </>;
};

const Component1: React.FC<PropsContent> = (props) => {
  useFetchLocation(props.contentRequest);
  if (props.status < 200) return null;
  if (!props.content) return null;
  return <Component {...props.content} />;
};
const FetchContent = connect(mapContent, actionsContent)(Component1);
export default FetchContent;