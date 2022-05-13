import React, { FunctionComponent } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getMessage } from "../components/Blocks/Fetching";
import { H1 } from "../components/Elements/Icon";
import { MainCenter } from "../components/Elements/Styled";
import { device, theme } from "../components/GlobalStyles";
export const Error = styled.div`
  font-size: 22rem;
  color: ${theme.color.primary};
  ${theme.font.Bold}
  @media ${device.laptop} {
    font-size: 16rem;
  }
  @media ${device.tablet} {
    font-size: 12rem;
  }
`;
export const ErrorMessage = styled.div`
  font-size: 3rem;
  color: ${theme.color.primary};
  ${theme.font.Pattaya}
  @media ${device.tablet} {
    font-size: 2rem;
  }
`;
const Basic: FunctionComponent = () => {
  let { id } = useParams() as any;

  return (
    <>
      <H1 src={"error"}> {getMessage(id)} </H1>
      <MainCenter>
        <Error>{id}</Error>
        <ErrorMessage>{id === "404" ? "Контент не найден." : "Ошибочка сервера"}.</ErrorMessage>
      </MainCenter>
    </>
  );
};
export const ErrorPath: FunctionComponent = () => {
  return (
    <>
      <H1 src={"error"}>Такой страницы не существует. </H1>
      <MainCenter>
        <Error>404</Error>
        <ErrorMessage>{"Нет такой страницы."}.</ErrorMessage>
      </MainCenter>
    </>
  );
};

export default Basic;
