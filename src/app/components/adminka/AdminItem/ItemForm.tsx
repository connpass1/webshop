import { ErrorMessage, Field, FieldArray, Formik } from "formik";
import React from "react";
import ImageUploading, { ImageListType } from "react-images-uploading";
import { Link } from "react-router-dom";
import styled from "styled-components";
import * as Yup from "yup";
import { ItemModel } from "../../../models/ItemModel";
import { isEmpty, PropsReq } from "../../../store/helper";
import { TextIcon } from "../../Elements/Icon";
import { Image } from "../../Elements/Image";
import { Row } from "../../Elements/Styled";
import { Buttons, DIVUploader, FORM, GridSelect, Group, Input, Inputs, SingleLoader, StyledD, TextArea } from "../../Elements/StyledForms";
import { theme } from "../../GlobalStyles";
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
`;

const Basic: React.FC<{
  model: ItemModel;
  saveContentRequest: PropsReq;
}> = ({ model, saveContentRequest, children }) => {
  return (
    <Formik
      initialValues={model}
      validationSchema={Schema}
      onSubmit={(values, { setSubmitting }) => {
        delete values.parents;
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
            <Row>
              <Image src={values.icon} size={80} />
              <SingleLoader handle={(e: string) => setFieldValue("icon", e)} />
            </Row>
            <GridSelect>
              <Field as="select" name="quantity" className="select">
                <option value="UNLIMITED">всегда в наличии</option>
                <option value="LIMITED">под заказ </option>
                <option value="NOT_AVAILABLE">отсутствует</option>
              </Field>
              <span> наличие </span>
            </GridSelect>

            <div>
              <Row>
                <Field name="massa" type="number" placeholder={"10"} />
                <Field as="select" name="measure" className="select">
                  <option value="gram">гр.</option>
                  <option value="ml">мл. </option>
                </Field>
                <label htmlFor="massa"> {values.measure === "ml" ? "объём" : "massa"}</label>
              </Row>

              <ErrorMessage className="error" component={"div"} name="massa" />
            </div>

            <TextArea name="description" placeholder="описание" label={"описание"} />

            <FieldArray name="photo">
              {({ insert, remove, push }) => (
                <PHOTOS>
                  <span>фото товара</span>
                  {values.photo.length > 0 &&
                    values.photo.map((img, index) => (
                      <div key={index}>
                        <Field name={`photo.${index}`} placeholder={`http://....`} type="text" />
                        <Image src={img} size={200} />
                        <Button type="button" onClick={() => remove(index)} disabled={values.photo.length < 2}>
                          удалить
                        </Button>
                      </div>
                    ))}
                  {values.photo.length < 6 && (
                    <ImageUploading
                      multiple={true}
                      maxFileSize={1000000}
                      value={[]}
                      maxNumber={6 - values.photo.length}
                      onChange={(imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
                        const arr = values.photo;

                        for (let i = 0; i < imageList.length; i++) {
                          arr.push("" + imageList[i].dataURL);
                          setFieldValue("photo", arr);
                        }
                        console.log(imageList.length);
                      }}
                    >
                      {({ imageList, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove, isDragging, dragProps }) => (
                        <DIVUploader className="upload__image-wrapper">
                          <StyledD isDragging={isDragging} onClick={onImageUpload} {...dragProps}>
                            <div> нажмите сюда или </div> <div> перетащите файл для загрузки</div>
                          </StyledD>
                        </DIVUploader>
                      )}
                    </ImageUploading>
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
  );
};
export default Basic;
