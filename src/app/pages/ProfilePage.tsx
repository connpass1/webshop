import React, { useEffect, useState } from "react";
import { ProfileModel } from "../models/ProfileModel";
import { FlexCenter, FlexEnd } from "../components/Elements/Styled";
import { Button } from "../components/Elements/Button";
import styled from "styled-components";
import { device, theme } from "../components/GlobalStyles";
import InputMask, { BeforeMaskedStateChangeStates, InputState } from "react-input-mask";
const Form = styled.form`
  display: grid;
  align-items: center;
  grid-template-columns: 280px 80px;
  gap: 10px;
  @media ${device.desktop} {
    grid-template-columns: max-content;
    gap: 0;
    label {
      margin: 0 0 12px 0
    }
  };
  justify-content: center;
  margin: 20px 0;
  text-align: left;
  border: 2px solid ${theme.color.primary};
  padding: 12px;
  width: 400px;
  background-color: ${theme.color.primaryLight};;
  textarea {
    width: 100%;
    height: 120px;
    max-width: 240px;
    resize: none;;
  }
;
  input {
    width: 100%;;
  }
;
  i {
    width: 100%;
    color: ${theme.color.error};
  }
`;
function isEmail(val: string) {
  const regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!regEmail.test(val)) return "некоректный Email";
  return undefined;
}
function isPhone(val: number) {
  const ph = "" + val;
  if (ph.length != 10) return "некоректный номер телефона";
  return undefined;
}
const Component: React.FC<{ data: any, saveHandler: any }> = ({ data, saveHandler }) => {
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
  const handle = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    saveHandler({ "url": "/user/profile", "data": pr });
  };
  const handleChange = (event: any) => {
    console.log(event.target.name);
    if (pr)
      switch (event.target.name) {
        case "address":
          pr.address = event.target.value;
          break;
        case "phone":
          let p = event.target.value as string;
          p = p.replaceAll(" ", "");
          p = p.replaceAll("+7", "");
          p = p.replaceAll("(", "");
          p = p.replaceAll(")", "");
          pr.phone = parseInt(p);
          break;
        case "email":
          pr.email = event.target.value;
          break;
      }
    if (pr) setPr(new ProfileModel(pr));
  };
  if (!pr) return <>{JSON.stringify(data)} </>;
  const error = isEmail(pr.email) ? isEmail(pr.email) : isPhone(pr.phone);
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
    <Form onSubmit={handle}>
      <textarea id="address" name="address" placeholder="адрес" value={pr.address} onChange={handleChange} />
      <label htmlFor="address">адрес</label>
      <InputMask
        name={"phone"}
        mask={"+7 (9999) 999 999"}
        maskPlaceholder={null}
        beforeMaskedStateChange={beforeMaskedStateChange}
        defaultValue={pr.phone}
        onChange={handleChange}
      />
      <label htmlFor="phone">телефон</label>
      <input id="email" name="email" type="email" placeholder="email" value={(pr.email)} onChange={handleChange} />
      <label htmlFor="email">email</label>
      <i className="error">
        {error}
      </i>
      <FlexEnd> <Button type="submit" disabled={!!error}>применить</Button></FlexEnd>
    </Form>
  </FlexCenter>;
};
export default Component;
