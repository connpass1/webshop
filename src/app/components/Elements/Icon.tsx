import React, { useState } from "react";
import styled from "styled-components";
import { ISlug } from "../../models/IFaces";
import { Row } from "./Styled";

export const Icon: React.FC<{ src?: string }> = ({ src = "empty" }) => {
  if (src.length > 10) return <img src={src} alt="" className="icon" width={"1em"} height="1em" />;
  else
    return (
      <svg className={"icon"}>
        <use xlinkHref={`/img/svg/_sprite.svg#${src}`} />
      </svg>
    );
};

export const H1: React.FC<{ src?: string }> = ({ src, children }) => {
  return (
    <h1>
      <Icon src={src} />
      {children}
    </h1>
  );
};
const DIV = styled.div`
  grid-area: img;
  display: flex;
  justify-content: center;
  width: 1em;
  height: 1em;
`;
const StyledImg = styled.img<{ show: boolean }>`
  display: ${(props) => (props.show ? "none" : "inherit")} !important;
`;
export const TextIcon: React.FC<ISlug> = (props) => {
  return (
    <Row>
      <Icon src={props.icon}></Icon>
      <span>{props.name}</span>
    </Row>
  );
};
export const Image: React.FC<{ src: string }> = ({ src = "/img/box.png" }) => {
  const [state, setState] = useState(false);
  const handle = () => {
    setState(true);
  };
  return (
    <DIV>
      <StyledImg src={src} alt="иконка" onLoad={handle} show={!state} />
      <StyledImg src={"/img/box.png"} alt="иконка" show={state} />
    </DIV>
  );
};
