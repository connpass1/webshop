import classNames from "classnames";
import React, { useCallback, useMemo, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { ArticleModel } from "../../../models/ArticleModel";
import { mapContent, PropsContent, useFetchLocation } from "../../../store/helper";
import history from "../../../store/history";
import { actionsContent } from "../../../store/storeContent";
import { H1 } from "../../Elements/Icon";
import { MainStart } from "../../Elements/Styled";
import { Tabs } from "../AdminCatalog/AdminCatalog";
import ContentUpdated from "../AdminCatalog/ContentUpdated";
import DeleteForm from "../AdminCatalog/DeleteForm";
import ArticleForm from "./ArticleForm";
import ViewArticle from "./VewArticle";
const Component: React.FC<PropsContent> = (props) => {
  const { id } = useParams() as any;
  const { content, delContentRequest } = props;

  const model = useMemo(() => new ArticleModel(content), [content]);
  const handlerDelete = useCallback(() => {
    delContentRequest({ id: model.id, url: "/delete/page" });
  }, [delContentRequest, model]);
  if (!model.id) model.id = 0;
  if (id !== model.id) {
    model.id = content.id ? content.id : 0;
    history.replace({ pathname: "/admin/page/" + model.id });
  }

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
        {state === 1 && <ArticleForm model={new ArticleModel(undefined)} saveContentRequest={props.saveContentRequest} />}
        {state === 2 && <ArticleForm model={model} saveContentRequest={props.saveContentRequest} />}
        {state === 3 && <DeleteForm req={handlerDelete} header={"Удалить статью"} caption={model.name}></DeleteForm>}
      </MainStart>
    </>
  );
};

const Component1: React.FC<PropsContent> = (props) => {
  useFetchLocation(props.contentRequest);
  const { content, status } = props;

  if (status < 200) return null;
  if (!content) return null;
  if (status === 202)
    return (
      <>
        <H1 src={"error"}>Статья удалена</H1>
        <main>todo</main>
      </>
    );

  return (
    <>
      {props.status > 200 && <ContentUpdated />}
      {props.status > 199 && <Component {...props} />}
    </>
  );
};
const FetchContent = connect(mapContent, actionsContent)(Component1);
export default FetchContent;
