import React from "react";
import { ErrorMessage, Field, Form } from "formik";
import styled from "styled-components";
import { device, theme } from "../GlobalStyles";

const Grid = styled.div`
  display: grid;
  gap: 12px;
  padding: 12px 24px;
  border-radius: 8px;
  border: 1px inset #55555510;
  align-items: center;
  max-width: 90vw;
`;
export const Group = styled(Grid)`
  grid-template-areas: "i l" "i l" "e e";
  grid-template-columns:  min-content 220px;
  justify-items: stretch;
  gap: 0 12px;

  @media ${device.mobile} {
    grid-template-areas: "l " "i " "e";
    grid-template-columns:  min-content;
    label {
      margin: 0 0 6px 0;
    }
  }

  .error {
    grid-area: e;
    padding: 6px 0 0 0;
    color: ${theme.color.error};;
  }
`;
export const Area = styled(Grid)`
  grid-template-areas: "i " "l" "e";

  textarea {
    resize: vertical;
  }

  .error {
    grid-area: e;
    padding: 6px 0 0 0;
    color: ${theme.color.error};
    height: 1rem;
  }
`;

interface Props {
  columns: number;
}

export const GRID = styled(Grid)<Props>`
  grid-template-columns: ${(props) => `repeat(${props.columns},min-content)`};
  grid-area: g;
  //width: 100%;
`;
export const StyledForm = styled(Form)`
  margin: 12px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  background-color: ${theme.color.primaryLight};
  padding: 12px;
align-self: center;
  @media ${device.mobile} {
    padding: 0;
    margin: 0;
    gap: 12px;
    min-width: 100%;
  }

  label {
    color: ${theme.color.primary};
    grid-area: l;
  }

  .buttons {
    display: flex;
    grid-area: b;
  }

}

input[type=text], input[type=number], input[type=password],
select,
optgroup,
textarea {
  margin: 0;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  border: 1px;
  border-color: ${theme.color.primary};
  border-radius: 4px;
  box-shadow: 0 0 10px ${theme.color.primaryLight};
  outline: none !important;

  :focus {
    outline: none !important;
    border: 1px;
    box-shadow: 0 0 10px ${theme.color.primary};
  }
}

;
textarea {

  min-height: 240px;
}

input, textarea {
  padding: 4px;
  font-size: 1.2rem;
}

input[type=reset], input[type=submit] {
  background-color: ${theme.color.primary};
  color: white;
  flex-grow: 1;
  cursor: pointer;
  margin: 12px;
  border-radius: 0;

  :disabled {
    opacity: 1;
    background-color: ${theme.color.disabled};
    cursor: initial;
    border: none;
  }
`;
export const TextArea: React.FC<{ name: string, label: string, placeholder?: string }>
  = ({ name, label, placeholder }) => {
  return <Area>
    <label htmlFor={name}>{label}</label>
    <Field as="textarea" name={name} placeholder={placeholder} />
    <ErrorMessage className="error" component={"div"} name={name} />
  </Area>;
};

export const Input: React.FC<{ name: string, label: string, type?: string, placeholder?: string, props?: any }>
  = ({
       name, label, type = "text", placeholder, props
     }) => {
  return <Group>
    <label htmlFor={name}> {label} </label>
    <Field name={name} type={type} {...props} placeholder={placeholder} />
    <ErrorMessage className="error" component={"div"} name={name} />
  </Group>;
};