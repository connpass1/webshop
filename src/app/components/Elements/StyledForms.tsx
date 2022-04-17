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

  input {
    max-width: 70%;
  }

  max-width: 90vw;
`;
export const Group = styled(Grid)`
  grid-template-areas: "i l" "i l" "e e";
  grid-template-columns: 280px 220px;
  @media ${device.tablet} {
    grid-template-areas: "l " "i " "e";
    grid-template-columns:  min-content;
  }

`;
export const Area = styled(Grid)`
  grid-template-areas: "i " "l" "e";

  textarea {
    resize: vertical;
  }
`;

interface Props {
  columns: number;

}

export const GRID = styled(Grid)<Props>`
  grid-template-columns: ${(props) => `repeat(${props.columns},min-content)`};

  //width: 100%;

`;
export const StyledForm = styled(Form)`
  display: grid;
  width: min-content;
  gap: 24px;
  background-color: ${theme.color.primaryLight};
  padding: 12px;
  justify-items: stretch;
  justify-self: center;
  align-self: center;

  label {
    color: ${theme.color.primary};
    grid-area: l;
  }

  input {
    grid-area: i;
  }

  button {
    border-radius: 0;
    margin-top: 12px;
  }

  em {
    grid-area: e;
    padding: 6px 0 0 0;
    color: ${theme.color.error};;
  }
`;
export const TextArea: React.FC<{ name: string, label: string, placeholder?: string }> = ({
                                                                                            name, label
                                                                                            , placeholder
                                                                                          }) => {
  return <Area>
    <label htmlFor={name}>{label}</label>
    <Field as="textArea" name={name} placeholder={placeholder} />
    <em><ErrorMessage name={name} /></em>
  </Area>;
};

export const Input: React.FC<{ name: string, label: string, type?: string, placeholder?: string, props?: any }> = ({
                                                                                                                     name,
                                                                                                                     label,
                                                                                                                     type = "text",
                                                                                                                     placeholder,
                                                                                                                     props
                                                                                                                   }) => {
  return <Group>
    <label htmlFor={name}> {label} </label>
    <Field name={name} type={type} {...props} placeholder={placeholder} />
    <em><ErrorMessage name={name} /></em>
  </Group>;
};