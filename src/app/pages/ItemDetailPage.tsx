import React, { FunctionComponent } from "react";
import { Breadcrumbs } from "../components/Elements/Breadcrumbs";
import {  IItemDetail } from "../store/Models";
import AddToCart from "../components/Blocks/AddToCard";
import { Image } from "../components/Elements/Image";
const Component: FunctionComponent <{detail:IItemDetail}>= ({detail }) => {

const {item,amount,caption,description,} =detail
  return (
        <>
          <Breadcrumbs parent={item?.parent}  />
          <h1>{item?.name}</h1>
         <p >{ caption}</p>
          <p >{ amount}</p>
          <p >{ description}</p>
          {item&&<>
          {item?.id}
          {item?.parent}
            <Image src="/img/test.jpeg" alt={item.name} />

             <AddToCart item={ item} /> <p>цена { item.price}</p>
            </>}

        </>
      )
 ;
};

export default Component;
