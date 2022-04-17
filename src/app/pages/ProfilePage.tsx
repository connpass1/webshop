import React, { useEffect, useState } from "react";
import { ProfileModel } from "../models/ProfileModel";
import { FlexCenter } from "../components/Elements/Styled";
import { Button } from "../components/Elements/Button";
import styled from "styled-components";
import { theme } from "../components/GlobalStyles";
import InputMask, { BeforeMaskedStateChangeStates, InputState } from "react-input-mask";
import { ErrorMessage, Formik } from "formik";
import { CheckFetching } from "../components/Blocks/Fetching";
import { Group, Input, StyledForm, TextArea } from "../components/Elements/StyledForms";
import * as Yup from "yup";
import { isEmpty } from "../store/helper";

const Form = styled(StyledForm)`
  background-color: ${theme.color.primaryLight};
  width: min(800px, 100%);
  padding: 24px;
  margin-top: 24px; 
`;
const Schema = Yup.object().shape({
  email: Yup.string().email("Некорректен email")
});
const Component: React.FC<{ data: any, saveHandler: any, status: number }> = ({ data, saveHandler, status }) => {
  const [pr, setPr] = useState<ProfileModel | undefined>();
  useEffect(() => {
      function f(data: ProfileModel) {
        try {
          return new ProfileModel(data);
        } catch {
          return undefined;
        }
      }
      return setPr(f(data));
    },
    [data]
  );

  function toNumber(n: string | number) {
    let numb: any = (n + "").match(/\d/g);
    numb = numb.join("");
    return parseInt(numb);
  }

  if (!pr) return <>{JSON.stringify(data)} </>;
  //const error = isEmail(pr.email ) ? isEmail(pr.email ) : isPhone(pr.phone );
  const beforeMaskedStateChange = (
    states: BeforeMaskedStateChangeStates
  ): InputState => {
    let { value } = states.currentState;
    const newValue = value.replace(/[^0-9]/g, "");
    if (newValue.length < 10) {
      return states.nextState;
    }
    if (newValue.length === 10) {
      value = newValue.replace(/^(\d{2})(\d{4})(\d{4})$/, "($1) $2-$3");
    } else if (newValue.length > 10) {
      value = newValue.replace(/^(\d{2})(\d{5})(\d{4})(\d*)$/, "($1) $2-$3");
    }
    return {
      value: value,
      selection: {
        start: value.length,
        end: value.length
      }
    };
  };
  return <FlexCenter>

    <Formik
      initialValues={pr}
      validationSchema={Schema}
      validate={values => {
        const errors: any = {};
        if (!values.phone) {
          errors.phone = "номер телефона незаполнен";
        } else if (toNumber(values.phone) > 999999944444) {
          errors.phone = "номер телефона некорректен" + toNumber(values.phone);
        } else if ((toNumber(values.phone) + "").length !== 11) {
          errors.phone = "номер телефона некорректен" + (toNumber(values.phone) + "").length;
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(false);
        let profileModel = new ProfileModel(values);
        profileModel.phone = toNumber(profileModel.phone + "");
        saveHandler({ "url": "/user/profile", "data": new ProfileModel(profileModel) });
      }}
    >
      {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting
        }) => (

        <Form onSubmit={handleSubmit}>
          <TextArea name="address" placeholder="адрес" label={"адрес"} />
          <Group>
            <InputMask
              name={"phone"}
              mask={"+7 (9999) 999 999"}
              placeholder={"+ 7 (9999) 999 999"}
              size={15}
              maskPlaceholder={null}
              beforeMaskedStateChange={beforeMaskedStateChange}
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <label htmlFor={"phone"}> телефон </label>
            <em><ErrorMessage name={"phone"} /></em>
          </Group>
          <Input name="email" type="text" label={"email"} props={{ placeholder: "email" }} />
          <FlexCenter><CheckFetching status={status} /></FlexCenter>

          <Button disabled={
            isEmpty(touched) ||
            !isEmpty(errors) ||
            isSubmitting}>сохранить</Button>
        </Form>
      )}
    </Formik>


  </FlexCenter>;
};
export default Component;
