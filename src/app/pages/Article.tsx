import React from "react";
import { connect } from "react-redux";
import { H1 } from "../components/Elements/Icon";
import { ArticleContentModel } from "../models/ArticleModel";
import { mapContent, PropsContent, useFetchLocation } from "../store/helper";
import { actionsContent } from "../store/storeContent";

const Component: React.FC<any> = (props) => {
  const model: ArticleContentModel = new ArticleContentModel(props);
  return (
    <>
      <H1 src={model.article.icon}> {model.title}</H1>
      <main className={"start"}>
        {JSON.stringify(props)}
        <div dangerouslySetInnerHTML={{ __html: `<div>${model.content}</div>` }}></div>
      </main>
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
