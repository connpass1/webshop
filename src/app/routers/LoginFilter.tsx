import React, { FunctionComponent } from "react";
import { connect } from "react-redux";
import { actionsUser } from "../store/storeUser";
import { isEmpty, mapFetchUser } from "../store/helper";
import styled from "styled-components";
import { Button } from "../components/Elements/Button";
import { FlexCenter, FlexEnd } from "../components/Elements/Styled";

import LoginRouter from "./LoginRouter";

import { theme } from "../components/GlobalStyles";
import { Field, Formik } from "formik";
import * as Yup from "yup";
import { CheckFetching } from "../components/Blocks/Fetching";
import { Input, StyledForm } from "../components/Elements/StyledForms";

type Props = ReturnType<typeof mapFetchUser> & typeof actionsUser;
const Root = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: center;
  justify-items: center;
`;
const Div = styled.div`
  background-color: ${theme.color.primaryLight};
  padding: 12px;
  box-shadow: 12px ${theme.color.grey};
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  border-color: currentColor;
  justify-self: center;
  align-self: center;
  color: ${theme.color.primary};
`;
const FORM = styled(StyledForm)`

  input[type="radio"]:checked + label {
    font-weight: bold;
    text-decoration: underline;

  }

  input[type="radio"] + label {
    cursor: pointer;
    user-select: none;
  }
;

  input[type="radio"] {
    display: none;
    cursor: pointer;
  }
`;


const Schema = Yup.object().shape({
  name: Yup.string()
    .min(4, "Минмимум 4 символа!")
    .max(40, "Максимум 40 символов!")
    .required("обязательное поле!"),
  password: Yup.string()
    .min(6, "Ммнмимум 6 символов!")
    .max(20, "Максимум 20 символов!")
    .required("обязательное поле!"),

  password1: Yup.string().when("password", {
    is: (val: string | any[]) => (val && val.length > 0 ? true : false),
    then: Yup.string().oneOf(
      [Yup.ref("password")],
      "пароли не совпадают"
    )
  })
});


const Component: FunctionComponent<Props> = (props) => {
  const { loginUserRequest, customer, status, registrationUserRequest } = props;

  if (customer.id && props.children) return <> {props.children}</>;
  if (customer.id) return < LoginRouter customer={customer} />;
  return (
    <Root>
      <Div>

        <Formik initialValues={{ name: "", password: "", password1: "", reg: "One" }}
                validationSchema={Schema}
                onSubmit={(values, { setSubmitting }) => {
                  setSubmitting(false);


                  setSubmitting(false);
                  if (values.reg === "One") loginUserRequest(values.name, values.password);
                  else registrationUserRequest(values.name, values.password);


                }}>
          {({ errors, values, touched, isSubmitting }) => (
            <FORM>
              <FlexEnd>
                <Field type="radio" name="reg" id={"rad1"} value="One" /> <label htmlFor={"rad1"}> Авторизация </label>
                <span> &nbsp;/&nbsp; </span>
                <Field type="radio" name="reg" id={"rad2"} value="Two" /><label
                htmlFor={"rad2"}> Регистрация </label></FlexEnd>
              <Input label={"логин или номер телефона"} name={"name"} />
              <Input label={"пароль"} name={"password"} type={"password"} />
              {values.reg === "Two" && <Input label={"повторите пароль"} name={"password1"} type={"password"} />}
              < FlexCenter><CheckFetching status={status} /></FlexCenter>
              <Button type="submit" disabled={
                isEmpty(touched) ||
                !isEmpty(errors) ||
                isSubmitting || (values.reg === "Two" && values.password1 !== values.password)
              }>Сохранить</Button>
            </FORM>)}
        </Formik>

      </Div>
    </Root>

  );
};
const connectedComponent = connect(mapFetchUser, actionsUser)(Component);
export default connectedComponent;
