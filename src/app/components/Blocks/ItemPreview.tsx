import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { IItem } from "../../models/IFases";
import { Image } from "../Elements/Image";
import { device, theme } from "../GlobalStyles";
import AddToCard from "./AddToCard";
import { Articular } from "./Articular";

const Section = styled.section`
  grid-template-areas:
      "h  h" 
      " img    name" 
      " img    price"
  " add   add";
  @media ${device.laptopL} {
    grid-template-areas:
        "h  h"
         "img     name" 
     " img    price"
   " add   add"
  ;
  };

  @media ${device.laptop} {
    grid-template-areas:"h  "
      " name"
      " img   "
      " price"
      " add  "
  ;
  };
  @media ${device.tablet} {
    grid-template-areas:
      "h  h" 
      " img    name"
      " img    price"
      " add    add  "
  ;
  }
  @media ${device.mobile} {
    grid-template-areas:
      "h  " 
      "name "
      " img  "
      " img   " 
    " price " 
    " add  "
  ;
  }

  .name {
    grid-area: name;
    padding: 12px;
    text-decoration: none;
    color: ${theme.color.secondary};
  }
;

  .price {
    grid-area: price;
    padding: 12px;
    font-size: 1.8em;
  }

  @media ${device.mobile} {
    border-radius: 0;
    width: 100vw ;
    margin: 0 -10px ;
  }
`;
const Component: React.FC<IItem> = (item) => {
  return <Section>
    <Articular val={item.id} />
    <Image src="/img/box.png" alt={item.name} />
    <Link className={"name"} to={`/item/${item.itemDetailId}`}>
      {item.name}</Link>
    <div className="price">
      цена - &shy;  {item.price}
    </div>
    <AddToCard item={item} />
  </Section>;
};
export default React.memo(Component);
