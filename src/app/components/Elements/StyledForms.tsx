import { ErrorMessage, Field, Form } from "formik";
import React from "react";
import styled from "styled-components";
import { Icon } from "../../components/Elements/Icon";
import FileBase64 from "../adminka/FileBase64";
import { device, theme } from "../GlobalStyles";
const Grid = styled.div`
  display: grid;
  gap: 12px;
  padding: 12px 24px;
  border-radius: 8px;
  border: 1px inset #55555510;
  align-items: center;
  @media ${device.mobile} {
    padding: 4px 12px;
    border: none;
  }
`;
export const GridIcon = styled(Grid)`
  .select {
    grid-area: s !important;
  }
  input[type="text" i] {
    grid-area: i !important;
  }
  .icon {
    font-size: 32px;
    justify-content: center;
    align-items: center;
  }

  grid-template-areas: " icon i  s ." "l  i  b  b";
  grid-template-columns: 40px auto min-content min-content;
  @media ${device.mobile} {
    grid-template-areas: " icon i  i s" "l  b  b  b";
    grid-template-columns: 40px 1fr 1fr min-content;
  }
`;

export const IconUpload = styled(Grid)`
  grid-template-columns: 1fr 3fr;
  justify-items: center;
  align-items: center;
`;

export const Group = styled(Grid)`
  grid-template-areas: "i l" "i l" "e e";
  grid-template-columns: min-content 220px;
  justify-items: stretch;
  gap: 0 12px;
  @media ${device.tablet} {
    justify-self: center;
    justify-content: center;
  }
  @media ${device.mobile} {
    grid-template-areas: "l " "i " "e";
    grid-template-columns: min-content;
    label {
      margin: 0 0 6px 0;
    }
  }

  .error {
    grid-area: e;
    padding: 6px 0 0 0;
    color: ${theme.color.error};
  }
`;
export const Area = styled(Grid)`
  grid-template-areas: "i " "l" "e";

  textarea {
    resize: vertical;
    height: 70px;
    min-height: 40px;
  }

  .error {
    grid-area: e;
    padding: 6px 0 0 0;
    color: ${theme.color.error};
    height: 1rem;
  }
`;

export const GridSelect = styled(Grid)`
  grid-template-columns: "min-content 1fr";
`;
export const FORM = styled(Form)`
  padding: 12px;
  margin: 12px 0;
  border-radius: 8px;
  justify-self: center;
  align-self: center;
  display: grid;
  gap: 12px;
  background-color: ${theme.color.primaryLight};
  .input,
  input[type="text"],
  input[type="number"],
  input[type="password"],
  input[type="number"],
  input[type="select"],
  select,
  optgroup,
  textarea {
    margin: 0;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
    padding: 4px;
    border-color: ${theme.color.primaryLight} !important;
    border: 1px ridge;
    border-radius: 4px;
    color: ${theme.color.primary};
    outline: none !important;
    :focus {
      outline: none !important;
      box-shadow: 0 0 10px ${theme.color.primary};
    }
    ::placeholder {
      color: ${theme.color.secondary};
    }
  }

  label,
  span {
    color: ${theme.color.primary};
    font-style: italic;
    grid-area: l;
  }

  input[type="submit"],
  input[type="button"],
  input[type="reset"] {
    align-items: center;
    user-select: none;
    display: inline-flex;
    flex-wrap: nowrap;
    justify-content: center;
    background-color: ${theme.color.primary};
    color: white;
    flex-grow: 1;
    cursor: pointer;

    border-radius: 0;
    border: none;
    font-size: 1.2rem;
    font-weight: normal;
    :disabled {
      background-color: ${theme.color.disabled};
      cursor: initial;
      border: none;
    }
    :focus {
      box-shadow: none;
    }
    @media ${device.mobile} {
      margin: 12px 0 0 0;
    }
  }
  @media ${device.tablet} {
    padding: 0px;
    border-radius: 0;
    width: 100vw;
  }

  @media ${device.mobile} {
    gap: 4px;
    padding: 8px 0 0 0;
  }
`;
export const Inputs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 2fr);
  gap: 12px;

  @media ${device.laptopL} {
    display: flex;
    flex-direction: column;
  }
`;

export const Buttons = styled.div`
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: min-content;
  @media ${device.tablet} {
    gap: 4px;
  }
`;

export const TextArea: React.FC<{ name: string; label: string; placeholder?: string }> = ({ name, label, placeholder }) => {
  return (
    <Area>
      <label htmlFor={name}>{label}</label>
      <Field as="textarea" name={name} placeholder={placeholder} />
      <ErrorMessage className="error" component={"div"} name={name} />
    </Area>
  );
};

export const Input: React.FC<{ name: string; label: string; type?: string; placeholder?: string; props?: any }> = ({
  name,
  label,
  type = "text",
  placeholder,
  props,
}) => {
  return (
    <Group>
      <label htmlFor={name}> {label} </label>
      <Field name={name} type={type} {...props} placeholder={placeholder} />
      <ErrorMessage className="error" component={"div"} name={name} />
    </Group>
  );
};
export const IconLoader: React.FC<{ value?: string; handle: any }> = ({ handle, value = "empty" }) => {
  return (
    <GridIcon>
      <Icon src={value} />
      <label htmlFor={"icon"}> иконка </label>
      <Field name="icon" type="text" placeholder="home" />
      <Field as="select" name="icon" className="select">
        <option value="empty">....</option>
        <option value="alcohol">alcohol</option>
        <option value="bear">bear</option>
        <option value="cake">cake</option>
      </Field>
      <FileBase64 text="загрузить&nbsp;иконку" onDone={handle} />
    </GridIcon>
  );
};
