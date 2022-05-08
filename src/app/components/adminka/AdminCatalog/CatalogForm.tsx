import { Field, Formik } from "formik";
import React, { useMemo } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import { CategoryModel } from "../../../models/CategoryModel";
import { isEmpty, mapSettings, PropsReq } from "../../../store/helper";
import { Icon } from "../../Elements/Icon";
import { GRID, Input, StyledForm } from "../../Elements/StyledForms";
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
    <Field as="select" name="parentId">
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
  const parentId = useMemo(() => {
    function f(cat: CategoryModel) {
      return cat.getParent().id;
    }
    return f(category);
  }, [category]);
  const initialValues = {
    id: category.id,
    name: category.name,
    position: category.position,
    icon: category.icon,
    parentId: parentId,
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Schema}
      onSubmit={(values, { setSubmitting }) => {
        values.parentId = values.parentId;
        saveContentRequest({ data: values, url: "/admin/category" });
        alert(JSON.stringify(values));
        setSubmitting(false);
      }}
    >
      {({ errors, touched, values, isSubmitting }) => (
        <StyledForm>
          <Input type="text" name="name" placeholder="название" label={"название"} />
          <Input type="number" name="position" label={"позиция"} />
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
            <ConnectedSelect active="menu" />
            группа
          </GRID>

          <div className={"buttons"}>
            <input type={"reset"} value={"отмена"} disabled={isEmpty(touched)} />
            <input type={"submit"} value={"применить"} disabled={!isEmpty(errors) || isSubmitting} />
          </div>
        </StyledForm>
      )}
    </Formik>
  );
};
export default Component;
