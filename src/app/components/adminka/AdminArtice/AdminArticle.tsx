import React, { useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import { ArticleModel } from "../../../models/ArticleModel";
import { PropsContent } from "../../../store/helper";
import { H1 } from "../../Elements/Icon";
import { MainStart } from "../../Elements/Styled";
import DeletedContent from "../AdminCatalog/DeletedContent";
import DeleteForm from "../AdminCatalog/DeleteForm";
import Tabs from "../AdminCatalog/Tabs";
import ArticleForm from "./ArticleForm";
import ViewArticle from "./VewArticle";
const Component: React.FC<PropsContent> = (props) => {
  const { id } = useParams() as any;
  const { content, delContentRequest, saveContentRequest } = props;
  const model = useMemo(() => new ArticleModel(content), [content]);
  const handlerDelete = useCallback(() => {
    if (model) delContentRequest({ id: model.id, url: "/delete/page" });
  }, [delContentRequest, model]);

  const DelForm = useMemo(() => <DeleteForm req={handlerDelete} caption={model.name}></DeleteForm>, [handlerDelete, model.name]);
  if (props.status === 202) return <DeletedContent />;
  return (
    <>
      <H1 src={model?.icon && model.icon.length > 3 ? model.icon : "edit"}>
        {model?.title && model.title.length > 3 ? model.title : "Создать статью"}
      </H1>
      <MainStart>
        <Tabs status={props.status}>
          {model.id > 0 && <ViewArticle {...model} />}
          <ArticleForm model={model} saveContentRequest={saveContentRequest} />
          {model.id > 0 && DelForm}
        </Tabs>
      </MainStart>
    </>
  );
};

export default Component;
