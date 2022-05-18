import { Field, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import { ArticleModel } from "../../../models/ArticleModel";
import { isEmpty } from "../../../store/helper";
import { ActionTypesContent } from "../../../store/storeContent";
import { Buttons, FORM, GridSelect, IconLoader, Input, TextArea } from "../../Elements/StyledForms";
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
  position: Yup.number().required("обязательное поле"),
  content: Yup.string().required("обязательное поле").min(50, "Минимум 50 символа!").required("обязательное поле"),
});

const Basic: React.FC<{
  model: ArticleModel;
  saveContentRequest: (data: any) => { type: ActionTypesContent; data: any };
}> = ({ model, saveContentRequest }) => {
  const article = { ...model };

  return (
    <>
      <Formik
        initialValues={article}
        validationSchema={Schema}
        onSubmit={(values, { setSubmitting }) => {
          const article = new ArticleModel(values);
          saveContentRequest({ data: article, url: "/admin/page" });
          setSubmitting(false);
        }}
      >
        {({ errors, touched, values, isSubmitting, setFieldValue }) => (
          <FORM>
            <Input type="text" name="name" placeholder="название" label={"название"} />
            <Input type="text" name="title" placeholder="заголовок" label={"заголовок"} />
            <Input type="number" name="position" label={"позиция"} />
            <TextArea name="content" placeholder="контент" label={"контент"} />
            <IconLoader value={values.icon} handle={(e: string) => setFieldValue("icon", e)} />

            <GridSelect>
              <Field as="select" name="nav" className="select">
                <option value="OTHER">нет</option>
                <option value="MENU">меню</option>
                <option value="FOOTER">футер</option>
                <option value="NAV">нав</option>
              </Field>
              <span> размещение </span>
            </GridSelect>
            <Buttons>
              <input type={"reset"} value={"отмена"} disabled={isEmpty(touched)} />
              <input type={"submit"} value={"применить"} disabled={!isEmpty(errors) || isSubmitting} />
            </Buttons>
          </FORM>
        )}
      </Formik>
    </>
  );
};

export default Basic;
