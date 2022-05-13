import { Formik } from "formik";
import React from "react";
import styled from "styled-components";
import { FORM } from "../../Elements/StyledForms";
import { theme } from "../../GlobalStyles";

const DeleteForm = styled(FORM)`
  color: ${theme.color.primary};
`;
const Header = styled.div`
  border-bottom: 2px solid currentColor;
  ${theme.font.Pattaya}
  font-size:1.5em;
  padding: 12px;
`;
const Caption = styled.div`
  display: flex;
  justify-content: center;
  align-self: center;
  text-align: center;
  ${theme.font.Bold}
  font-size:1.8rem;
`;

const Div = styled.div`
  display: flex;
  box-sizing: border-box;

  justify-content: center;
  align-self: center;
`;

const Component: React.FC<{ req: () => void; header: string; caption: string }> = ({ req, header, caption, children }) => {
  return (
    <Div>
      <Formik onSubmit={req} initialValues={{}}>
        <DeleteForm>
          <Header>{header}</Header>
          <Caption>{caption}</Caption>
          {children}
          <input type={"submit"} value={"удалить"} />
        </DeleteForm>
      </Formik>
    </Div>
  );
};
export default Component;
