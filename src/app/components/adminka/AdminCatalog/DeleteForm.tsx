import { Formik } from "formik";
import React from "react";
import styled from "styled-components";
import { StyledForm } from "../../Elements/StyledForms";
import { theme } from "../../GlobalStyles";

const FORM = styled(StyledForm)`
  display: flex;
  color: ${theme.color.primary};
  flex-direction: column;
  min-width: 280px;
  header {
    font-size: 1.2rem;
    border-bottom: 1px solid ${theme.color.primary};
  }
  .center {
    text-align: center;
    font-size: 1.5rem;
    font-weight: bold;
  }
  color: ${theme.color.primary};
`;
const Div = styled.div`
  display: flex;

  box-sizing: border-box;
  min-height: 100%;
  justify-content: center;
`;

const Component: React.FC<{ req: () => void; header: string; caption: string }> = ({ req, header, caption, children }) => {
  return (
    <Div>
      <Formik onSubmit={req} initialValues={{}}>
        <FORM>
          <header>{header}</header>
          <div className="center">{caption}</div>
          {children}
          <div className={"buttons"}>
            <input type={"submit"} value={"удалить"} />
          </div>
        </FORM>
      </Formik>
    </Div>
  );
};
export default Component;
