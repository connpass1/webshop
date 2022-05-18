import { Field, Formik } from "formik";
import React from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import { CategoryModel } from "../../../models/CategoryModel";
import { isEmpty, mapSettings, PropsReq } from "../../../store/helper";
import { Buttons, FORM, IconLoader, Input, Inputs } from "../../Elements/StyledForms";
const Schema = Yup.object().shape({
  name: Yup.string()
    .required("обязательное поле")
    .min(2, "Минимум 2 символа!")
    .max(20, "Максимум 20 символов!")
    .required("обязательное поле"),
  position: Yup.number().required("обязательное поле"),
});

const Select: React.FC<ReturnType<typeof mapSettings> & { active: String }> = (props) => {
  const { id } = useParams() as any;
  return (
    <Field as="select" name="parentId" className="select">
      <option value="menu">Меню</option>
      {props.settings?.categoryLinks
        ?.filter((x) => x.id - id !== 0)
        .map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
    </Field>
  );
};
const ConnectedSelect = connect(mapSettings)(Select);

const Component: React.FC<{
  category: CategoryModel;
  saveContentRequest: PropsReq;
}> = ({ category, saveContentRequest }) => {
  const initialValues = {
    id: category.id,
    name: category.name,
    position: category.position,
    icon: category.icon,
    parentId: category.getParentId(),
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Schema}
      onSubmit={(values, { setSubmitting }) => {
        values.parentId = Number(values.parentId);
        saveContentRequest({ data: values, url: "/admin/catalog" });
        alert(JSON.stringify(values));
        setSubmitting(false);
      }}
    >
      {({ errors, touched, values, isSubmitting, setFieldValue }) => (
        <FORM>
          <Inputs>
            <Input type="text" name="name" placeholder="название" label={"название"} />
            <Input type="number" name="position" label={"позиция"} />
            <IconLoader value={values.icon} handle={(s: string) => setFieldValue("icon", s)} />
          </Inputs>
          <Buttons>
            <input type={"reset"} value={"отмена"} disabled={isEmpty(touched)} />
            <input type={"submit"} value={values.id === 0 ? "создать" : "сохранить"} disabled={!isEmpty(errors) || isSubmitting} />
          </Buttons>
        </FORM>
      )}
    </Formik>
  );
};
export default Component;
