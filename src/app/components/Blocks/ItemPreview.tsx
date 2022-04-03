import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { IItem } from "../../store/Models";
import { Row } from "../Elements/Styled";

const ItemVew = styled.figure`
  border: solid 1px var(--primary-color);
  color: var(--primary-color);
  font-size: 1em;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  display: flex;
  cursor: pointer;
  flex-basis: "content";
  width: 180px;
  display: flex;
  flex-direction: column;
  margin: 10px;
  .img {
    align-self: center;
  }
  .caption {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    color: white;
    background-color: var(--primary-color);
    margin: 0;
    padding: 8px;
  }
`;

const Component: React.FC<IItem> = (item) => {
  return (
    <Link to={`/item/${item.id}`}>
      <ItemVew>
        <div className="caption">{item.name}</div>
        <div className="img">{item.icon ? item.icon : <img src="/img/box.png" alt={item.name}></img>}</div>
        <Row>цена -{item.price}</Row>
      </ItemVew>
    </Link>
  );
};

export default Component;
