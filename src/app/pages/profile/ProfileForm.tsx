import { ErrorMessage, Formik } from "formik";
import React from "react";
import InputMask, { BeforeMaskedStateChangeStates, InputState } from "react-input-mask";
import styled from "styled-components";
import * as Yup from "yup";
import { Group, Input, StyledForm, TextArea } from "../../components/Elements/StyledForms";
import { theme } from "../../components/GlobalStyles";
import { ProfileModel } from "../../models/ProfileModel";
import { isEmpty, PropsContent } from "../../store/helper";

const Form = styled(StyledForm)`
  background-color: ${theme.color.primaryLight};
  width: min(800px, 100%);
  padding: 24px;
  margin-top: 24px;
`;

const Schema = Yup.object().shape({
  email: Yup.string().email("Некорректен email"),
});
const Component: React.FC<PropsContent> = (props) => {
  const { content, status, saveContentRequest } = props;

  function toNumber(n: string | number) {
    let numb: any = (n + "").match(/\d/g);
    numb = numb.join("");
    return parseInt(numb);
  }

  //const error = isEmail(pr.email ) ? isEmail(pr.email ) : isPhone(pr.phone );
  const beforeMaskedStateChange = (states: BeforeMaskedStateChangeStates): InputState => {
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
        end: value.length,
      },
    };
  };

  if (status < 200) return null;
  //if (  status===201) return <Redirect to={"/enter" }/>;

  if (!content) return null;

  return (
    <>
      <Formik
        initialValues={{ ...new ProfileModel(content) }}
        validationSchema={Schema}
        validate={(values) => {
          const errors: any = {};
          if (!values.phone) {
            errors.phone = "номер телефона незаполнен!";
          } else if ((toNumber(values.phone) + "").length !== 11) {
            errors.phone = "номер телефона некорректен!";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
          let profileModel = new ProfileModel(values);
          profileModel.phone = toNumber(profileModel.phone + "");
          saveContentRequest({ url: "/profile", data: new ProfileModel(profileModel) });
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <Form>
            <TextArea name="address" placeholder="адрес" label={"адрес"} />
            <Group>
              <InputMask
                name={"phone"}
                mask={"+7 (9999) 999 999"}
                placeholder={"+ _ (____) ___ ___"}
                size={15}
                maskPlaceholder={null}
                beforeMaskedStateChange={beforeMaskedStateChange}
                value={values.phone}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <label htmlFor={"phone"}> телефон </label>
              <ErrorMessage className={"error"} component={"div"} name={"phone"} />
            </Group>
            <Input name="email" type="text" label={"email"} props={{ placeholder: "email" }} />

            <div className={"buttons"}>
              <input type={"reset"} value={"отмена"} disabled={isEmpty(touched)} />
              <input type={"submit"} value={"сохранить"} disabled={!isEmpty(errors) || isSubmitting || isEmpty(touched)} />
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};
export default Component;
