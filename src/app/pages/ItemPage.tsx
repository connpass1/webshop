import React, { FunctionComponent, useMemo } from "react";
import { Breadcrumbs } from "../components/Blocks/Breadcrumbs";
import { IItemDetail } from "../models/IFases";
import AddToCart from "../components/Blocks/AddToCard";
import { Image } from "../components/Elements/Image";
import { Icon } from "../components/Elements/Icon";
import styled from "styled-components";
import { Articular } from "../components/Blocks/Articular";
import { ItemModel } from "../models/ItemModel";

const Section = styled.section`
  width: 100%;
  grid-template-areas:
      " h h  h " 
      " c c c " 
      " n  n n "
      " d d  d "  
      " p p  p "
      " ph ph  ph "
      " img   img  .  " 
      " q   .  price  "
      " add   add    add  ";
  .description {
    grid-area: d;
  }
  .properties {
    grid-area: p;
  }
  .photos {
    grid-area: ph;
  }
  .name {
    grid-area: n;
  }
  .caption {
    grid-area: c;
  }
  .quantity {
    grid-area: q;
  }
  .properties{
    grid-area: p;
  }
`;
const Component: FunctionComponent<{ detail: IItemDetail | undefined }> = ({ detail }) => {
  if (!detail) return null;
  if (!detail.item) return null;
  const itemModel= new ItemModel(detail);
  if (!itemModel?.name) return null;

  return (
    <>
      <Breadcrumbs parent={itemModel.parent} />
      <h1><Icon src={itemModel.icon} />{itemModel.name}</h1>

      <Section>
        <Articular val={itemModel.id} />
        <div className={"caption"}>caption {itemModel.caption} </div>
        <div className={"description"}>description {itemModel.description}</div>
        <div className={"price"}>цена {itemModel.price}</div>
        <div className={"quantity"}>на складе {itemModel.quantity}</div>
        <div className={"name"}>{itemModel.name} </div>
        <div className={"properties"}>
          {itemModel.properties?.map(prop=><
              div key={prop.id}>
              <p>{prop.name} {prop.value} </p>
            </div>
          )}
        </div>
        <div className={"photos"}>
          { !itemModel.photos || itemModel.photos.length===0 && <Image src="/img/test.jpeg" alt={itemModel.name} />}
          {itemModel.photos?.map((src,key)=><
              div key={key}>
              <p>{src}   </p>
            </div>
          )}
        </div>


        <AddToCart item={detail.item} />
      </Section>
    </>
  )
    ;
};
export default  React.memo(Component);
