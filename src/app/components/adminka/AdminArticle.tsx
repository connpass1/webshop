import React, { useCallback, useMemo } from "react";
import { isEmpty, mapContent, PropsContent, useFetchLocation } from "../../store/helper";
import { ArticleContentModel, ArticleModel } from "../../models/ArticleModel";
import { Field, Formik } from "formik";
import * as Yup from "yup";
import { GRID, Input, StyledForm, TextArea } from "../Elements/StyledForms";
import { H1, Icon } from "../Elements/Icon";
import { FlexEvenly } from "../Elements/Styled";
import { Redirect, useParams } from "react-router-dom";
import history from "../../store/history";
import { actionsContent, ActionTypesContent } from "../../store/storeContent";
import { connect } from "react-redux";
import { ButtonSecondary, RedirectButton } from "../Elements/Button";

const Schema = Yup.object().shape({
  name: Yup.string()
    .required("обязательное поле")
    .min(2, "Минимум 2 символа!")
    .max(20, "Максимум 20 символов!")
    .required("обязательное поле"),
  title: Yup.string()
    .required("обязательное поле")
    .min(5, "Минимум 5 символов!")
    .max(50, "Максимум 50 символов!")
    .required("обязательное поле"),
  position: Yup.number()
    .required("обязательное поле"),
  content: Yup.string()
    .required("обязательное поле")
    .min(50, "Минимум 50 символа!")
    .required("обязательное поле")
});

const Basic: React.FC<{
  model: ArticleContentModel, saveContentRequest: (data: any) => { type: ActionTypesContent, data: any },
}> = ({ model, saveContentRequest, children }) => {

  const article = { ...model, ...model.article };

  return <main>

    <Formik
      initialValues={article}
      validationSchema={Schema}
      onSubmit={(values, { setSubmitting }) => {
        const article = new ArticleModel(values);
        const articleContentModel = new ArticleContentModel(values);
        articleContentModel.article = article;
        saveContentRequest({ data: articleContentModel, url: "/admin/page" });
        setSubmitting(false);
      }}
    >
      {({
          errors,
          touched,
          values,
          isSubmitting
          /* and other goodies */
        }) => (
        <StyledForm >
          <Input type="text" name="name" placeholder="название" label={"название"} />
          <Input type="text" name="title" placeholder="заголовок" label={"заголовок"} />
          <Input type="number" name="position" label={"позиция"} />
          <TextArea name="content" placeholder="контент" label={"контент"} />
          <GRID columns={3}>
            <div><Field name="icon" type="text" placeholder="home" />
            </div>
            <div><Icon src={values.icon} /></div>
            <div><label htmlFor={"icon"}> иконка </label></div>
          </GRID>
          <GRID columns={2}>
            <Field as="select" name="nav">
              <option value="OTHER">нет</option>
              <option value="MENU">меню</option>
              <option value="FOOTER">футер</option>
              <option value="NAV">нав</option>
            </Field>
            рвзмещение
          </GRID>
          <div className={"buttons"}>
            <input type={"reset"} value={"отмена"} disabled={isEmpty(touched)} />
            <input type={"submit"} value={"применить"} disabled={!isEmpty(errors) || isSubmitting} />
          </div>
        </StyledForm>
      )}
    </Formik>
    {children}
  </main>;

};
const Component: React.FC<PropsContent> = (props) => {
  const { id } = useParams();
  const { content, status, delContentRequest } = props;
  const model = useMemo(() => new ArticleContentModel(content), [content]);
  const handlerDelete = useCallback(() => {
      delContentRequest(
        { id: model.id, url: "/admin/delete/page" }
      );
    }
    , [delContentRequest,model]);
  if (!model.id) model.id = 0;
  if (id !== model.id) {
    model.id = content.id ? content.id : 0;
    model.article.id = model.id;
    history.replace({ pathname: "/admin/page/" + model.id });
  }
  return <> <H1 src={model.id === 0 ? "edit" : "create"}>
    {id > 0 ? "Редактировать" : "Создать"} статью </H1>
    <Basic model={model} saveContentRequest={props.saveContentRequest}>
      <FlexEvenly  >
        <ButtonSecondary disabled={model.id=== 0}  onClick={handlerDelete}> удалить статью </ButtonSecondary>
        < RedirectButton disabled={model.id=== 0}   to={"/page/" + model.id}>просмотреть статью  </RedirectButton>
      </FlexEvenly>
    </Basic>
  </>;
};

const Component1: React.FC<PropsContent> = (props) => {
  useFetchLocation(props.contentRequest);
  if (props.status < 200) return null;
  if (props.status === 202) return <Redirect to={"/admin/pages/1"} />;
  if (!props.content) return null;

  return <Component {...props} />;
};
const FetchContent = connect(mapContent, actionsContent)(Component1);
export default FetchContent;