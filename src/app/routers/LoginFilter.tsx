import { Field, Formik } from "formik";
import React, { FunctionComponent } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import * as Yup from "yup";
import { CheckFetching } from "../components/Blocks/Fetching";
import { MainCenter, Row } from "../components/Elements/Styled";
import { FORM, Input } from "../components/Elements/StyledForms";
import { theme } from "../components/GlobalStyles";
import LoginRouter from "../pages/profile/ProfilePage";
import { isEmpty, mapFetchUser } from "../store/helper";
import { actionsUser } from "../store/storeUser";

type Props = ReturnType<typeof mapFetchUser> & typeof actionsUser;

const Schema = Yup.object().shape({
  name: Yup.string().min(4, "Минимум 4 символа!").max(40, "Максимум 40 символов!").required("обязательное поле!"),
  password: Yup.string().min(6, "Ммнимум 6 символов!").max(20, "Максимум 20 символов!").required("обязательное поле!"),

  password1: Yup.string().when("password", {
    is: (val: string | any[]) => (val && val.length > 0 ? true : false),
    then: Yup.string().oneOf([Yup.ref("password")], "пароли не совпадают"),
  }),
});
const Checks = styled.div`
  display: grid;
  user-select: none;
  justify-self: flex-end;
  align-self: flex-end;
  gap: 4px;
  grid-template-columns: repeat(3, min-content);
  margin: 8px;
  justify-items: center;
  font-weight: bold;
`;

const LoginForm = styled(FORM)`
  input[type="radio"]:checked + label {
    border-bottom: 2px solid ${theme.color.secondary};
    color: ${theme.color.secondary};
  }

  input[type="radio"] + label {
    cursor: pointer;
    user-select: none;
  }
  input[type="radio"] {
    display: none;
    cursor: pointer;
  }
`;
const Component: FunctionComponent<Props> = (props) => {
  const history = useHistory();
  const { loginUserRequest, customer, status, registrationUserRequest } = props;
  if (customer.id && props.children) return <> {props.children}</>;
  //if (customer.id) history.go(-1);
  if (customer.id) history.replace({ pathname: "/profile" });
  if (customer.id) return <LoginRouter customer={customer} />;
  return (
    <MainCenter>
      <Formik
        initialValues={{ name: "", password: "", password1: "", reg: "One" }}
        validationSchema={Schema}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
          setSubmitting(false);
          if (values.reg === "One") loginUserRequest(values.name, values.password);
          else registrationUserRequest(values.name, values.password);
        }}
      >
        {({ errors, values, touched, isSubmitting }) => (
          <LoginForm>
            <Checks>
              <div>
                <Field type="radio" name="reg" id={"rad1"} value="One" /> <label htmlFor={"rad1"}> Авторизация </label>
              </div>
              <div> &nbsp;/&nbsp; </div>
              <div>
                <Field type="radio" name="reg" id={"rad2"} value="Two" />
                <label htmlFor={"rad2"}> Регистрация </label>
              </div>
            </Checks>
            <Input label={"логин или номер телефона"} name={"name"} />
            <Input label={"пароль"} name={"password"} type={"password"} />
            {values.reg === "Two" && <Input label={"повторите пароль"} name={"password1"} type={"password"} />}
            <Row className={"center"}>
              <CheckFetching status={status} />
            </Row>

            <input type={"submit"} value={"применить"} disabled={!isEmpty(errors) || isSubmitting || isEmpty(touched)} />
          </LoginForm>
        )}
      </Formik>
    </MainCenter>
  );
};
const connectedComponent = connect(mapFetchUser, actionsUser)(Component);
export default connectedComponent;
