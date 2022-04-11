import React, { useState } from "react";
import { FlexCenter } from "./Styled";
import styled from "styled-components";

export const IMG = styled.img<{ state: boolean, size: number }>`  
  width: 200px;
  height: 200px;
  display: ${(props) => (props.state ? "none" : "block")};
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  margin: 10px 0;
`;
export const Image: React.FC<{ src: string, alt?: string, size?: number }> = ({ src, alt = "", size = 200 }) => {
  const [state, setState] = useState(false);
  const handle = () => {
    setState(true);

  };
  return (
    <FlexCenter>
      <IMG src={src} alt={alt} state={!state} size={size}
           onLoad={handle}
      />
      <IMG src={"/img/box.png"} alt={alt} state={state} size={size}
      />

    </FlexCenter>

  );
};