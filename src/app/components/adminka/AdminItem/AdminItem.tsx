import React, { useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import { createItemModel } from "../../../models/ItemModel";
import { PropsContent } from "../../../store/helper";
import ItemFull from "../../Blocks/ItemFull";
import { H1 } from "../../Elements/Icon";
import { MainStart } from "../../Elements/Styled";
import DeletedContent from "../AdminCatalog/DeletedContent";
import DeleteForm from "../AdminCatalog/DeleteForm";
import Tabs from "../AdminCatalog/Tabs";
import ItemForm from "./ItemForm";
const Component: React.FC<PropsContent> = (props) => {
  const { delContentRequest, saveContentRequest, status } = props;
  const model = useMemo(() => createItemModel(props.content), [props.content]);
  const handlerDelete = useCallback(() => {
    if (model) delContentRequest({ id: model.id, url: "/delete/item" });
  }, [delContentRequest, model]);

  const DelForm = useMemo(() => {
    if (!model) return null;

    return <DeleteForm req={handlerDelete} caption={model.name}></DeleteForm>;
  }, [handlerDelete, model]);

  const { id } = useParams() as any;

  if (props.status === 202) return <DeletedContent />;

  if (!model) return null;
  const isNew = Number(id) === 0;
  return (
    <>
      <H1 src={!isNew ? model.icon : "edit"}>{!isNew ? model.name : "Создать товар"}</H1>
      <MainStart>
        <Tabs status={props.status}>
          {!isNew && <ItemFull {...model} />}
          <ItemForm model={model} saveContentRequest={saveContentRequest} />
          {!isNew && DelForm}
        </Tabs>
      </MainStart>
    </>
  );
};

export default Component;
