import React, { useCallback } from "react";
import { isEmpty, PropsContent } from "../../store/helper";
import { ArticleModel } from "../../models/ArticleModel";
import styled from "styled-components";
import { Button } from "../Elements/Button";
import { Field, Formik } from "formik";
import * as Yup from "yup";
import { GRID, Input, StyledForm, TextArea } from "../Elements/StyledForms";
import { theme } from "../GlobalStyles";
import { Icon } from "../Elements/Icon";
import { Column, FlexAround, FlexCenter, LINK } from "../Elements/Styled";

const Form = styled(StyledForm)`
  background-color: ${theme.color.primaryLight};
  padding: 24px;
  margin-top: 24px;
  color: ${theme.color.primary};

  button {
    width: 100%;
    justify-self: stretch;
  }
`;
const Schema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Минимум 2 символа!")
    .max(20, "Минимум 20 символов!")
    .required("обязательное поле"),
  title: Yup.string()
    .min(5, "Минимум 5 символа!")
    .max(50, "Минимум 50 символов!")
    .required("обязательное поле"),
  position: Yup.number()
    .required("обязательное поле"),
  content: Yup.string()
    .min(50, "Минимум 50 символа!")
    .required("обязательное поле")
});

const Component: React.FC<PropsContent> = (props) => {
  const handlerDelete = useCallback(() =>
      props.saveContentRequest(
        { data: new ArticleModel(props.content), url: "/admin/delete/page" }
      )
    , [props]);

  const { content } = props;
  if (!content) return null;
  return <>
    <h1><Icon src={content["id"] ? "edit" : "create"} />
      {content["id"] ? "Редактировать" : "Создать"} статью </h1>
    <FlexCenter>
      <Column>
        <Formik
          initialValues={new ArticleModel(content)}
          validationSchema={Schema}
          onSubmit={(values, { setSubmitting }) => {
            props.saveContentRequest({ data: values, url: "/admin/page" });
            setSubmitting(false);
          }}
        >
          {({
              errors,
              touched,
              values,
              handleSubmit,
              isSubmitting
              /* and other goodies */
            }) => (
            <Form onSubmit={handleSubmit}>
              <Input type="text" name="name" placeholder="name" label={"название"} />
              <Input type="text" name="title" placeholder="title" label={"заголовок"} />
              <Input type="number" name="position" label={"position"} />
              <TextArea name="content" placeholder="content" label={"content"} />
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
              <Button type="submit" disabled={!isEmpty(errors) || isSubmitting || isEmpty(touched)}>
                Submit
              </Button>
            </Form>
          )}
        </Formik>
        {content["id"] && <FlexAround>
          <Button onClick={handlerDelete}>

            удалитьь статью
          </Button>
          <LINK to={"/page/" + content["id"]}>просмотреть статью </LINK>
        </FlexAround>}
      </Column>
    </FlexCenter>;
  </>;
};

export default Component;