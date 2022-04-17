import React, { FunctionComponent } from "react";
import { Breadcrumbs } from "../components/Blocks/Breadcrumbs";
import { IItemDetail } from "../models/IFases";
import AddToCart from "../components/Blocks/AddToCard";
import { Image } from "../components/Elements/Image";
import { Icon } from "../components/Elements/Icon";
import styled from "styled-components";
import { Articular } from "../components/Blocks/Articular";

const Section = styled.section`
  grid-template-areas:
      " h h  h "  
      " d d  d "  
      " img   img   name   " 
      " price    price price  "
      " .   add    .  ";
  .description {
    grid-area: d;
  }
  .properties {
    grid-area: p;
  }
  .photos {
    grid-area: ph;
  }
`;
const Component: FunctionComponent<{ detail: IItemDetail | undefined }> = ({ detail }) => {
  if (!detail) return null;
  const { item, amount, caption, description, photos, properties } = detail;
  if (!item) return null;
  const { price, name, id } = item;
  return (
    <>
      <Breadcrumbs parent={item.parent} />
      <h1><Icon src={item.icon} />{item.name}</h1>
      <Section>
        <Articular val={item.id} />
        <div className={"caption"}>caption {caption} </div>
        <div className={"description"}>description {description}</div>
        <div className={"price"}>цена {price}</div>
        <div className={"price"}>цена {price}</div>
        <div className={"name"}>amount {amount}</div>
        <Image src="/img/test.jpeg" alt={name} />
        <AddToCart item={item} />
      </Section>
    </>
  )
    ;
};
export default Component;
