import axios from "axios";
import React, { FunctionComponent, useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { getErrorStatus } from "../store/helper";
import { ICatalog } from "../models/IFases";
import { CatalogLink } from "./Elements/ItemLink";
import { Link } from "react-router-dom";
import { SERVERNAME, webMenu } from "../data";
import { device, theme } from "./GlobalStyles";
const Styled = styled.div`
  border-radius: 8px;
  width: 240px;
  background-color: white;
  margin: 12px;
  @media (${device.mobile}) {
    border: 1px solid ${theme.color.primary};
    width: 100%;
  } 
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, 100%);
    margin: 12px; 
    a {
      color: ${theme.color.primary};
      text-decoration: underline;
    }
  }
`;
export const Nav = styled.nav<{ large: boolean; open: boolean }>`
  position: ${(props) => (props.large ? "relative" : "absolute")};
  left: ${(props) => (props.large || props.open ? "0" : "-100%")};
  animation-name: ${(props) => (props.large ? undefined : props.open ? inAnimation : outAnimation)};
  animation-duration: 0.5s;
  grid-area: nav;
  display: flex;
  flex-direction: column;
  min-width: 240px;
  justify-items: center;
  align-items: center;
  border-radius: 8px;
  box-shadow: ${theme.shadow};
  background-color: white;
  border-right: 1px solid ${theme.color.primary};
  min-height: 100vh;
  color: ${theme.color.primary};
`;
const Component: FunctionComponent<{ closeNav: any, large: boolean; open: boolean }> = ({ closeNav, large, open }) => {
  const [data, setData] = useState<ICatalog>();
  const [status, setStatus] = useState(0);
  useEffect(() => {
    axios
      .get(SERVERNAME + `/catalog/0`)
      .then((res) => {
        setData(res.data as ICatalog);
      })
      .catch((e) => {
        console.log(e);
        setStatus(getErrorStatus(e));
      });
  }, []);
  if (data)
    return (
      <Nav large={large} open={open}>
        <Styled>
          <div className={"grid"}>
            <hr />
            <Link to="/catalog/0" onClick={closeNav}><b>Каталог</b></Link>
            {data.childrenCategory && (
              <>
                {data.childrenCategory.map((item) => (
                  <CatalogLink key={item.id} item={item} onClick={closeNav} />
                ))}
              </>
            )}
          </div>
          {!large && <div className={"grid"}>
            <hr />
            {webMenu.map((item, key) => (
              <Link key={key} to={item.link}>
                {item.name}
              </Link>
            ))}
          </div>}
        </Styled></Nav>
    );
  return <>{status} </>;
};
const outAnimation = keyframes`
  0% {
    left: 0;
    opacity: 1;
  }
  100% {
    left: -400px;
    opacity: 0.5;
  }
`;
const inAnimation = keyframes`
  0% {
    left: -200px;
    opacity: 0.5;
  }
  100% {
    left: 0;
    opacity: 1;
  }
`;
export default Component;
