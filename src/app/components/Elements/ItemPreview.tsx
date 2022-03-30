import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { IItem } from "../../store/Models";

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
  img {
    width: 160px;
    height: 160px;
    align-self: center;
    background-image: url(/img/box.png);
  }
  .caption {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    color: white;
    background-color: var(--primary-color);
    margin: 0;
  }
  p {
    padding: 0.2rem 0.5rem;
  }
`;

const Component: React.FC<IItem> = (item) => {
  return (
    <div>
      <Link to={`/item/${item.id}`}>
        <ItemVew>
          <div className="caption">{item.name}</div>
          <p>{item.caption}</p>
          <img src={item.icon} alt={item.description}></img>

          <p>цена -{item.price}</p>
        </ItemVew>
      </Link>
    </div>
  );
};
export default Component;
