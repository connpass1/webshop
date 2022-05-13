import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { IItem } from "../../models/IFaces";
import { Image } from "../Elements/Image";
import { device, theme } from "../GlobalStyles";
import AddToCard from "./AddToCard";
import { Articular } from "./Articular";

const Section = styled.section`
border: 1px solid currentColor;

display:grid;
grid-template-areas:
      "h  h" 
      " name    ."
      " img    img "
      " price    price"
     
      " add    add  ";
      grid-column:140px 140px;

border-radius: 8px;
  header {
    text-align: center;
    display: inline-block;
    grid-area: h;
    border-radius: 8px 8px 0 0;
    color: white;
    justify-items:stretch;
    justify-content: stretch;
    align-items: stretch;
    justify-self: stretch;
    background-color: ${theme.color.primary};
    padding: 12px;
    @media ${device.mobile} {
      border-radius: 0;
    }
     
  }
  @media ${device.mobile} {
    border-radius: 0;
  } 
 
  
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
      <Image src={item.icon} alt={item.name} />
      <Link className={"name"} to={`/item/${item.id}`}>
        {item.name}
      </Link>
      <div className="price">цена - &shy; {item.price}</div>
      <AddToCard item={item} />
    </Section>
  );
};
export default React.memo(Component);
