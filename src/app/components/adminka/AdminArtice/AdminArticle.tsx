import classNames from "classnames";
import React, { useCallback, useMemo, useState } from "react";
import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { ArticleModel, createArticleModel } from "../../../models/ArticleModel";
import { mapContent, PropsContent, useFetchLocation } from "../../../store/helper";
import { actionsContent, ActionTypesContent } from "../../../store/storeContent";
import { H1 } from "../../Elements/Icon";
import { MainStart } from "../../Elements/Styled";
import { Tabs } from "../AdminCatalog/AdminCatalog";
import ContentUpdated from "../AdminCatalog/ContentUpdated";
import DeleteForm from "../AdminCatalog/DeleteForm";
import ArticleForm from "./ArticleForm";
import ViewArticle from "./VewArticle";
const Component: React.FC<{
  model: ArticleModel;
  handlerDelete: () => void;
  saveContentRequest: (data: any) => {
    type: ActionTypesContent;
    data: any;
  };
}> = ({ model, handlerDelete, saveContentRequest }) => {
  const { id } = useParams() as any;

  const [state, setState] = useState(model.id === 0 ? 1 : 0);
  return (
    <>
      <H1 src={model?.icon && model.icon.length > 3 ? model.icon : "edit"}>
        {model?.title && model.title.length > 3 ? model.title : "Создать статью"}
      </H1>
      <MainStart>
        <Tabs>
          <button className={classNames({ active: state === 0 })} disabled={model.id === 0} onClick={() => setState(0)}>
            Просмотр
          </button>
          <button className={classNames({ active: state === 1 })} onClick={() => setState(1)}>
            Создать
          </button>
          <button className={classNames({ active: state === 2 })} disabled={model.id === 0} onClick={() => setState(2)}>
            Редактировать
          </button>
          <button className={classNames({ active: state === 3 })} disabled={model.id === 0} onClick={() => setState(3)}>
            Удалить
          </button>
        </Tabs>
        {state === 0 && <ViewArticle {...model} />}
        {state === 1 && <ArticleForm model={new ArticleModel(undefined)} saveContentRequest={saveContentRequest} />}
        {state === 2 && <ArticleForm model={model} saveContentRequest={saveContentRequest} />}
        {state === 3 && <DeleteForm req={handlerDelete} header={"Удалить статью"} caption={model.name}></DeleteForm>}
      </MainStart>
    </>
  );
};

const Component1: React.FC<PropsContent> = (props) => {
  useFetchLocation(props.contentRequest);
  const { content, status, delContentRequest, saveContentRequest } = props;
  const model = useMemo(() => createArticleModel(content), [content]);
  const handlerDelete = useCallback(() => {
    if (model) delContentRequest({ id: model.id, url: "/delete/page" });
  }, [delContentRequest, model]);

  if (!model) return null;
  if (status === 202)
    return (
      <>
        <H1 src={"error"}>Статья удалена</H1>
        <main>
          <Link to="/admin/pages">todo</Link>
        </main>
      </>
    );

  return (
    <>
      {props.status > 200 && <ContentUpdated />}
      {props.status > 199 && <Component model={model} handlerDelete={handlerDelete} saveContentRequest={saveContentRequest} />}
    </>
  );
};
const FetchContent = connect(mapContent, actionsContent)(Component1);
export default FetchContent;
