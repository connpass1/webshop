import { Field, FieldArray, Formik } from "formik";
import React, { useCallback, useMemo } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import * as Yup from "yup";
import { createItemModel, ItemModel } from "../../models/ItemModel";
import { isEmpty, mapContent, PropsContent, PropsReq, useFetchLocation } from "../../store/helper";
import { actionsContent } from "../../store/storeContent";
import FileBase64 from "../adminka/FileBase64";
import Breadcrumbs from "../Blocks/Breadcrumbs";
import { ButtonSecondary, RedirectButton } from "../Elements/Button";
import { H1, Icon, TextIcon } from "../Elements/Icon";
import { Image } from "../Elements/Image";
import { FlexEvenly, MainStart } from "../Elements/Styled";
import { Buttons, FORM, GridSelect, Group, IconUpload, Input, Inputs, TextArea } from "../Elements/StyledForms";
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

const Button = styled.button`
  background-color: ${theme.color.secondary};
  color: white;
  padding: 6px;
  font-size: 1rem;
  :disabled {
    background-color: ${theme.color.grey};
  }
`;

const PHOTOS = styled(Group)`
  flex-direction: column;
  display: flex;
  border: 1px inset #55555510;
  align-items: stretch;
  .inputs {
    margin: 12px 0;
    display: flex;
    flex-direction: column;
  }
`;

const Basic: React.FC<{
  model: ItemModel;
  saveContentRequest: PropsReq;
}> = ({ model, saveContentRequest, children }) => {
  return (
    <MainStart>
      <Formik
        initialValues={model}
        validationSchema={Schema}
        onSubmit={(values, { setSubmitting }) => {
          delete values.parents;
          alert(JSON.stringify(values, null, 2));
          saveContentRequest({ data: values, url: "/admin/item" });
          setSubmitting(false);
        }}
      >
        {({ errors, touched, isSubmitting, values, setFieldValue }) => (
          <FORM>
            <LINK to={"/admin/catalog/" + model.parent?.id}>
              <TextIcon {...model.parent} />
            </LINK>
            <Inputs>
              <Input name="name" label={"короткое название"} />
              <Input name="caption" label={"полное название"} />
              <Input type="number" name="price" label={"цена"} />
              <IconUpload>
                <div>
                  <Icon src={values.icon} />
                </div>
                <FileBase64
                  text="загрузить&nbsp;иконку"
                  onDone={(e: any) => {
                    setFieldValue("icon", e.base64);
                  }}
                />
              </IconUpload>
              <GridSelect>
                <Field as="select" name="quantity" className="select">
                  <option value="LIMITED">всегда в наличии</option>
                  <option value="UNLIMITED">под заказ </option>
                  <option value="NOT_AVAILABLE">отсутствует</option>
                </Field>
                <span> наличие </span>
              </GridSelect>

              <Input type="number" name="massa" label={"масса"} />
              <GridSelect>
                <Field as="select" name="measure" className="select">
                  <option value={0}>гр.</option>
                  <option value={1}>мл. </option>
                </Field>
                <span>единица измерения </span>
              </GridSelect>

              <TextArea name="description" placeholder="описание" label={"описание"} />
              <FieldArray name="photo">
                {({ insert, remove, push }) => (
                  <PHOTOS>
                    <span>фото товара</span>
                    {values.photo.length > 0 &&
                      values.photo.map((img, index) => (
                        <div className="inputs" key={index}>
                          <Field name={`photo.${index}`} placeholder={`http://....`} type="text" />
                          <Image src={img} size={40} />
                          <Button type="button" onClick={() => remove(index)} disabled={values.photo.length < 2}>
                            удалить
                          </Button>
                        </div>
                      ))}
                    {values.photo.length < 6 && (
                      <FileBase64
                        text="загрузить&nbsp;фото"
                        onDone={(e: any) => {
                          push(e.base64);
                        }}
                      />
                    )}
                  </PHOTOS>
                )}
              </FieldArray>
            </Inputs>
            <Buttons>
              <input type={"reset"} value={"отмена"} disabled={isEmpty(touched)} />
              <input type={"submit"} value={"сохранить"} disabled={!isEmpty(errors) || isSubmitting || isEmpty(touched)} />
            </Buttons>
          </FORM>
        )}
      </Formik>

      {children}
    </MainStart>
  );
};

const Component: React.FC<PropsContent> = (props) => {
  const model = useMemo(
    () => createItemModel(props.content),

    [props.content]
  );
  const { delContentRequest, saveContentRequest, status } = props;

  const handlerDelete = useCallback(() => {
    if (model) delContentRequest({ id: model.id, url: "/delete/item" });
  }, [delContentRequest, model]);

  useFetchLocation(props.contentRequest);

  if (status === 202)
    return (
      <>
        <H1 src={"error"}>Товар удален</H1>
        <main>
          <Link to="/admin/pages">todo</Link>
        </main>
      </>
    );
  //if (status === 201) return <Redirect to={"/admin/item/" + model.parent.id + "/" + model.id} />;
  if (!model) return null;
  return (
    <>
      <H1 src={model.id === 0 ? "edit" : "create"}>{model.id > 0 ? "Редактировать" : "Создать"} товар </H1>
      <Basic model={model} saveContentRequest={saveContentRequest}>
        <FlexEvenly>
          <ButtonSecondary disabled={model.id < 1} onClick={handlerDelete}>
            удалить товар
          </ButtonSecondary>
          <RedirectButton disabled={model.id < 1} to={"/item/" + model.id}>
            просмотреть товар
          </RedirectButton>
        </FlexEvenly>
      </Basic>
      <Breadcrumbs parent={model.parents} isAdmin={true} />
    </>
  );
};
const FetchContent = connect(mapContent, actionsContent)(Component);
export default FetchContent;
//{"id":null,"description":null,"item":{"id":0,"icon":null,"name":null,"price":0,"caption":null,"mass":0,"measure":null,"quantity":"UNLIMITED","parent":{"id":3,"name":"На мясном бульоне","icon":"meat"}},"photo":null,"composition":null,"parents":[{"id":1,"name":"Меню","icon":"home"},{"id":2,"name":"Первые блюда","icon":"soup"}]}
