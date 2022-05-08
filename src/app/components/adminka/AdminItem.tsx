import { ErrorMessage, Field, FieldArray, Formik } from "formik";
import React, { useCallback, useMemo } from "react";
import { connect } from "react-redux";
import { Link, Redirect, useParams } from "react-router-dom";
import styled from "styled-components";
import * as Yup from "yup";
import { ItemModel } from "../../models/ItemModel";
import { isEmpty, mapContent, PropsContent, PropsReq, useFetchLocation } from "../../store/helper";
import history from "../../store/history";
import { actionsContent } from "../../store/storeContent";
import { ButtonSecondary, RedirectButton } from "../Elements/Button";
import { H1, Icon } from "../Elements/Icon";
import { FlexEvenly } from "../Elements/Styled";
import { GRID, Group, Input, StyledForm, TextArea } from "../Elements/StyledForms";
import { theme } from "../GlobalStyles";

const Schema = Yup.object().shape({
  name: Yup.string().min(2, "Минимум 2 символа!").max(20, "Максимум 20 символов!").required("обязательное поле"),
  caption: Yup.string().min(4, "Минимум 4 символа!").max(50, "Максимум 50 символов!").required("обязательное поле"),
  description: Yup.string().min(4, "Минимум 4 символа!").max(50, "Максимум 50 символов!").required("обязательное поле"),
});
const LINK = styled(Link)`
  color: ${theme.color.primary};
  font-size: 1.5rem;
  border: 1px solid ${theme.color.primary};
  padding: 10px;
`;
const Buttons = styled.div`
  display: grid;
  gap: 12px;
  grid-template-columns: 1fr 1fr;
  justify-items: stretch;
  align-items: stretch;

  button {
    background-color: ${theme.color.secondary};
    color: white;
    padding: 6px;
    font-size: 1rem;
    :disabled {
      background-color: ${theme.color.secondaryLight};
    }
  }
`;

const PHOTOS = styled(Group)`
  button {
    background-color: ${theme.color.secondary};
    color: white;
    padding: 6px;
    font-size: 1rem;
  }
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-areas: "i " "l" "e";
`;
const Basic: React.FC<{
  model: ItemModel;
  saveContentRequest: PropsReq;
}> = ({ model, saveContentRequest, children }) => {
  return (
    <main>
      <Formik
        initialValues={model}
        validationSchema={Schema}
        onSubmit={(values, { setSubmitting }) => {
          alert(JSON.stringify(values, null, 2));
          // saveContentRequest({ data: values, url: "/admin/item" });
          setSubmitting(false);
        }}
      >
        {({ errors, touched, isSubmitting, values }) => (
          <StyledForm>
            <GRID columns={2}>
              <LINK to={"/admin/catalog/" + model.parentId}>
                <Icon src={model.parentIcon} />
                {model.parentName}
              </LINK>
              <span>группа</span>
            </GRID>

            <Input name="name" label={"короткое название"} />
            <Input name="caption" label={"полное название"} />

            <Input type="number" name="price" label={"цена"} />
            <GRID columns={3}>
              <div>
                <Field name="icon" type="text" placeholder="home" />
              </div>
              <div>
                <Icon src={values.icon} />
              </div>
              <div>
                <label htmlFor={"icon"}> иконка </label>
              </div>
            </GRID>
            <GRID columns={2}>
              <Field as="select" name="amount">
                <option value={0}>вcсегда в наличии</option>
                <option value={1}>под заказ </option>
                <option value={2}>отсутствует</option>
              </Field>
              <span> наличие </span>
            </GRID>
            <TextArea name="description" placeholder="описание" label={"описание"} />
            <FieldArray name="photos">
              {({ insert, remove, push }) => (
                <PHOTOS>
                  {values.photos.length > 0 &&
                    values.photos.map((photo, index) => (
                      <div className="row" key={index}>
                        <ImageGrid>
                          <Field name={`photo.${index}`} placeholder="http://..." type="text" />

                          <ErrorMessage name={`photo.${index}`} component="div" className="field-error" />
                        </ImageGrid>
                      </div>
                    ))}
                  <Buttons>
                    <button type="button" disabled={values.photos.length === 0} onClick={() => remove(values.photos.length - 1)}>
                      удалить
                    </button>
                    <button type="button" onClick={() => push("")}>
                      добавить
                    </button>
                  </Buttons>
                </PHOTOS>
              )}
            </FieldArray>

            <div className={"buttons"}>
              <input type={"reset"} value={"отмена"} disabled={isEmpty(touched)} />
              <input type={"submit"} value={"сохранить"} disabled={!isEmpty(errors) || isSubmitting || isEmpty(touched)} />
            </div>
          </StyledForm>
        )}
      </Formik>
      {children}
    </main>
  );
};
const Component: React.FC<PropsContent> = (props) => {
  const { content, status, delContentRequest } = props;
  const model = useMemo(() => new ItemModel(content), [content]);
  const { id } = useParams() as any;
  const handlerDelete = useCallback(() => {
    delContentRequest({ id: model.id, url: "/delete/item" });
  }, [delContentRequest, model]);

  if (status > 200) history.replace({ pathname: "/admin/item/" + model.id });
  return (
    <>
      <H1 src={id === 0 ? "edit" : "create"}>{id > 0 ? "Редактировать" : "Создать"} товар </H1>
      <Basic model={model} saveContentRequest={props.saveContentRequest}>
        <FlexEvenly>
          <ButtonSecondary disabled={id < 1} onClick={handlerDelete}>
            удалить товар
          </ButtonSecondary>
          <RedirectButton disabled={id < 1} to={"/item/" + id}>
            просмотреть товар
          </RedirectButton>
        </FlexEvenly>
      </Basic>
    </>
  );
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
