import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { IItem } from "../../store/Models";
import { Row } from "../Elements/Styled";
import { Image } from "../Elements/Image";
import { device, theme } from "../GlobalStyles";

const ItemVew = styled.div`
  border: solid 1px ${theme.color.primary};
  color: ${theme.color.primary};
  font-size: 1rem;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  display: flex;
  cursor: pointer;
  flex-basis: content;
  width: 100%; 
  flex-direction: column;
  @media ${device.mobile} {
    border:none;
  }

  .caption {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    color: white;
    background-color: ${theme.color.primary};
    margin: 0;
    padding: 8px;
    @media ${device.mobile} {
      border-radius: 0;
    }
  }
`;

const Component: React.FC<IItem> = (item) => {
  return (
    <Link to={`/item/${item.itemDetailId}`}>

      <ItemVew>
        <div className="caption">{item.name}</div>
        <Image src="/img/box.png" alt={item.name} />
        <Row>цена -{item.price}</Row>
      </ItemVew>
    </Link>
  );
};

export default Component;
