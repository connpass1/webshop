import React, { useRef } from "react";
import { useOutsideClick } from "../../store/helper";
import styled from "styled-components";
import { device } from "../GlobalStyles";

const DIV = styled.div`
 
   cursor: pointer;
  display: none;
  @media ${device.tablet} {
    display: flex;
  }
  #toggle {
    opacity: 0;
  }

  #toggle:checked ~ .menuBtn > span {
    transform: rotate(45deg);
  }
  #toggle:checked ~ .menuBtn > span::before {
    top: 0;
    transform: rotate(0);
  }
  #toggle:checked ~ .menuBtn > span::after {
    top: 0;
    transform: rotate(90deg);
  }
  #toggle:checked ~ .menu__box {
    visibility: visible;
    left: 0;
  }

  .menuBtn {
    display: flex;
    align-items: center;
    position: relative;
    top: 0;
    right: 8px; 
    width: 22px;
    height:22px; 
    cursor: pointer;
    z-index: 1;
  }

  
  .menuBtn > span,
  .menuBtn > span::before,
  .menuBtn > span::after {
    display: block;
    position: absolute; 
    width: 100%;
    height: 2px; 
    background-color: white; 
    transition-duration: .25s;
  }
  .menuBtn > span::before {
    content: '';
    top: -8px;
  }
  .menuBtn > span::after {
    content: '';
    top: 8px;
  } 
`;

export const Component: React.FC<{ openHandler: any, closeHandler: any, openBar: boolean }> = ({
                                                                                                 openHandler,
                                                                                                 closeHandler,
                                                                                                 openBar
                                                                                               }) => {
  const wrapperRef: React.Ref<any> = useRef(null);
  const click = () => {

    openHandler();
    // wrapperRef.current. onChange();
  };
  const outsideClick = () => {
    setTimeout(() => closeHandler(), 200);

    // wrapperRef.current. onChange();
  };
  // @ts-ignore
  useOutsideClick(wrapperRef, outsideClick);

  return <>
    <DIV ref={wrapperRef} onClick={click}>

      <  input id="toggle" type="checkbox" checked={openBar} />

      <label className="menuBtn" htmlFor="toggle">
        <span />
      </label> </DIV>{!openBar && <div className={"up"} />}
  </>;


};
export default React.memo(Component);