import React, { useCallback, useMemo } from "react";
import { ButtonSecondary, RedirectButton } from "../Elements/Button";
import { isEmpty, mapContent, PropsContent, useFetchLocation } from "../../store/helper";
import { FlexEvenly } from "../Elements/Styled";
import { Formik } from "formik";
import { Input, StyledForm } from "../Elements/StyledForms";

import * as Yup from "yup";
import { ItemModel } from "../../models/ItemModel";
import { actionsContent, ActionTypesContent } from "../../store/storeContent";
import history from "../../store/history";
import { H1 } from "../Elements/Icon";
import { Redirect, useParams } from "react-router-dom";
import { connect } from "react-redux";

const Schema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Минимум 2 символа!")
    .max(20, "Максимум 20 символов!")
    .required("обязательное поле"),
  caption: Yup.string()
    .min(4, "Минимум 4 символа!")
    .max(50, "Максимум 50 символов!")
    .required("обязательное поле"),
  description: Yup.string()
    .min(4, "Минимум 4 символа!")
    .max(50, "Максимум 50 символов!")
    .required("обязательное поле")
});

const Basic: React.FC<{
  model: ItemModel, saveContentRequest: (data: any) => { type: ActionTypesContent, data: any },

}> = ({ model, saveContentRequest, children }) => {

  return <main>
    <Formik
      initialValues={model}
      validationSchema={Schema}
      onSubmit={(values, { setSubmitting }) => {
        saveContentRequest({ data: values, url: "/admin/item" });
        setSubmitting(false);
      }}
    >
      {({
          errors,
          touched,
          isSubmitting
        }) => (
        <StyledForm   >
          <Input name="name" label={"короткое название"} />
          <Input name="caption" label={"полное название"} />
          <Input name="description" label={"описание"} />
          <Input type="number" name="amount" label={"на складе"} />
          <Input type="number" name="price" label={"цена"} />
          <Input name="icon" label={"иконка"} />
          <div className={"buttons"}>
            <input type={"reset"} value={"отмена"} disabled={isEmpty(touched)} />
            <input type={"submit"} value={"сохранить"}
                   disabled={!isEmpty(errors) || isSubmitting || isEmpty(touched)} />
          </div>
        </StyledForm>
      )}
    </Formik>
    {children}
  </main>;
};
const Component: React.FC<PropsContent> = (props) => {
  const { content, status, delContentRequest } = props;
  const model = useMemo(() => new ItemModel(content), [content]);
  const { id } = useParams();
  const handlerDelete = useCallback(() => {
      delContentRequest(
        { id: model.id, url: "/admin/delete/page" }
      );
    }
    , [delContentRequest,model]);


  if (status > 200) history.replace({ pathname: "/admin/item/" + model.id });
  return <> <H1 src={id === 0 ? "edit" : "create"}>
    {id > 0 ? "Редактировать" : "Создать"} товар </H1>

    <Basic model={model} saveContentRequest={props.saveContentRequest}>
      <FlexEvenly  >
        <ButtonSecondary disabled={id < 1} onClick={handlerDelete}>удалить товар</ButtonSecondary>
        <RedirectButton disabled={id < 1} to={"/item/" + id}>просмотреть товар </RedirectButton></FlexEvenly>
    </Basic>
  </>;
};

const Component1: React.FC<PropsContent> = (props) => {
  useFetchLocation(props.contentRequest);
  if (props.status < 200) return null;
  if (props.status === 202) return <Redirect to={"/admin/items/1"} />;
  if (!props.content) return null;
  return <Component {...props} />;
};
const FetchContent = connect(mapContent, actionsContent)(Component1);
export default FetchContent;