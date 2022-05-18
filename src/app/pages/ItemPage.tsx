import React, { FunctionComponent } from "react";
import styled from "styled-components";
import AddToCart from "../components/Blocks/AddToCard";
import { Articular } from "../components/Blocks/Articular";
import Breadcrumbs from "../components/Blocks/Breadcrumbs";
import { H1 } from "../components/Elements/Icon";
import { Image } from "../components/Elements/Image";
import { theme } from "../components/GlobalStyles";
import { ItemModel } from "../models/ItemModel";
const Main = styled.main`
  flex-wrap: no-wrap;
  justify-content: center;
  align-content: center;
`;
const Section = styled.section`
  display: grid;
  border-radius: 8px;
  box-shadow: ${theme.shadow};
  justify-self: center;
  align-self: center;
  grid-template-areas:
    " h h  pn "
    " c c c "
    " n  n n "
    " d d  d "
    " p p  p "
    " ph ph  ph "
    " img   img  .  "
    " q   .  price  "
    " add   add    add  ";
  grid-template-columns: 2fr 2fr 2fr;
  grid-template-rows: auto;
  gap: 12px;
  .description {
    grid-area: d;
  }

  .photos {
    grid-area: ph;
    display: flex;
    justify-content: center;
    overflow-x: auto;
    background-color: ${theme.color.greyLight};
  }

  .name {
    grid-area: n;
  }
  .parentName {
    grid-area: pn;
    text-align: end;
  }
  .caption {
    grid-area: c;
  }

  .quantity {
    grid-area: q;
  }

  .properties {
    grid-area: p;
  }
`;
const Component: FunctionComponent<{ content: any }> = ({ content }) => {
  if (!content.item) return null;
  const itemModel = new ItemModel(content);
  if (!itemModel?.name) return null;
  return (
    <>
      <Breadcrumbs parent={itemModel.parent} />
      <H1 src={itemModel.icon}>{itemModel.name}</H1>
      <Main>
        <Section>
          <Articular val={itemModel.id} />
          <p className={"name"}>{itemModel.name} </p>
          <span className={"parentName"}> {itemModel.parent.name} </span>
          <p className={"description"}>description {itemModel.description}</p>
          <p className={"price"}>цена {itemModel.price}</p>
          <p className={"quantity"}>на складе {itemModel.quantity}</p>

          <p className={"properties"}></p>
          <div className={"photos"}>
            {itemModel.photo?.map((src, key) => (
              <Image src={src} key={key} />
            ))}
          </div>
          <AddToCart item={content.item} />
        </Section>
      </Main>
    </>
  );
};

export default Component;
