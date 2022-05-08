import React, { FunctionComponent } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import AddToCart from "../components/Blocks/AddToCard";
import { Articular } from "../components/Blocks/Articular";
import Breadcrumbs from "../components/Blocks/Breadcrumbs";
import { H1 } from "../components/Elements/Icon";
import { Image } from "../components/Elements/Image";
import { ItemModel } from "../models/ItemModel";
import { mapContent, PropsContent, useFetchLocation } from "../store/helper";
import { actionsContent } from "../store/storeContent";

const Section = styled.section`
  justify-self: center;
  align-self: center;
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

  .properties {
    grid-area: p;
  }
`;
const Component: FunctionComponent<any> = (detail) => {
  if (!detail) return null;
  if (!detail.item) return null;
  const itemModel = new ItemModel(detail);
  if (!itemModel?.name) return null;

  return (
    <>
      <Breadcrumbs parent={itemModel.parent} />
      <H1 src={itemModel.icon}>{itemModel.name}</H1>
      <main>
        <Section>
          <Articular val={itemModel.id} />
          <div className={"caption"}>caption {itemModel.caption} </div>
          <div className={"description"}>description {itemModel.description}</div>
          <div className={"price"}>цена {itemModel.price}</div>
          <div className={"quantity"}>на складе {itemModel.quantity}</div>
          <div className={"name"}>{itemModel.name} </div>
          <div className={"properties"}></div>
          <div className={"photos"}>
            {itemModel.photos.length === 0 && <Image src="/img/test.jpeg" alt={itemModel.name} />}
            {itemModel.photos?.map((src, key) => (
              <div key={key}>
                <p>{src} </p>
              </div>
            ))}
          </div>

          <AddToCart item={detail.item} />
        </Section>
      </main>
    </>
  );
};
const Component1: React.FC<PropsContent> = (props) => {
  useFetchLocation(props.contentRequest);
  if (props.status < 200) return null;
  if (!props.content) return null;

  return <Component {...props.content} />;
};
const FetchContent = connect(mapContent, actionsContent)(Component1);
export default FetchContent;
