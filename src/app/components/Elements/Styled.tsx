import { Link } from "react-router-dom";
import styled from "styled-components";

export const FlexAround = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
`;
export const A = styled.a`
  display: flex;
  justify-items: center;
  justify-content: center;
  align-items: center;
  .icon {
    margin-right: -0.2em;
  }
`;
export const LINK = styled(Link)`
  display: flex;
  justify-items: center;
  justify-content: center;
  align-items: center;
  .icon {
    margin-right: -0.2em;
  }
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FlexEvenly = styled.div`
  display: flex;
  justify-self: stretch;
  align-self: center;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  flex-wrap: wrap;

  button,
  div {
    flex-grow: 1;
    margin: 12px;
  }
`;

export const Span = styled.span<{ after: string | undefined }>`
  :after {
    content: ${(props) => props.after && "'" + props.after + "'"};
  }
`;
