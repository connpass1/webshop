import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { IItem } from "../../models/IFases";
import { Image } from "../Elements/Image";
import { device, theme } from "../GlobalStyles";
import AddToCard from "./AddToCard";
import { Articular } from "./Articular";

const Section = styled.section`
border: 1px solid currentColor;
  header {
    text-align: center;
    display: inline-block;
    grid-area: h;
    border-radius: 8px 8px 0 0;
    color: white;
    justify-items:stretch;
    justify-content: stretch;
    align-items: stretch;
    
    background-color: ${theme.color.primary};
    padding: 12px;
    @media ${device.mobile} {
      border-radius: 0;
    }
     
  }
  @media ${device.mobile} {
    border-radius: 0;
  }
 
   
   
    grid-template-areas:
      "h  h"
      " img    name"
      " img    price"
      " add    add  ";
  
  @media ${device.mobile} {
    grid-template-areas:
      "h  "
      "name "
      " img  "
      " img   "
      " price "
      " add  ";
  }

  .name {
    grid-area: name;
    padding: 12px;
    text-decoration: none;
    color: ${theme.color.secondary};
  }
  .price {
    grid-area: price;
    padding: 12px;
    font-size: 1.8em;
  }

  
  }
`;
const Component: React.FC<IItem> = (item) => {
  return (
    <Section>
      <Articular val={item.id} />
      <Image src="/img/box.png" alt={item.name} />
      <Link className={"name"} to={`/item/${item.detailId}`}>
        {item.name}
      </Link>
      <div className="price">цена - &shy; {item.price}</div>
      <AddToCard item={item} />
    </Section>
  );
};
export default React.memo(Component);
