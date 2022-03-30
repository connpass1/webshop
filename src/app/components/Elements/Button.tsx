import React from "react";
import styled from "styled-components";

interface Props {
  loader?: boolean;
  text?: string;
  onClick: any;
}

export const Button = styled.div<Props>`
  background-color: var(--primary-color);
  color: white;
  font-size: 1em;
  padding: 0.5em;
  display: inline-block;
  user-select: none;
  cursor: pointer;
  flex-basis: "content";
`;
const Inner = styled.div`
  width: "30px";
  display: flex;
  align-items: center;
`;
export const ButtonLoader: React.FC<Props> = (props) => {
  return (
    <Button loader={props.loader} onClick={props.onClick}>
      <Inner>
        <span style={{ width: "30px", height: "30px" }}>
          {props.loader && (
            <svg
              version="1.1"
              id="L9"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 100 100"
              xmlSpace="preserve"
            >
              <path fill="#fff" d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">
                <animateTransform
                  attributeName="transform"
                  attributeType="XML"
                  type="rotate"
                  dur="1s"
                  from="0 50 50"
                  to="360 50 50"
                  repeatCount="indefinite"
                />
              </path>
            </svg>
          )}
        </span>
        <div>{props.text}</div>
      </Inner>
    </Button>
  );
};
