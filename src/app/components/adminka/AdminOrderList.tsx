import React from "react";
import Pageable from "../Blocks/Pageable";
import { H1 } from "../Elements/Icon";

const Component: React.FC<any> = (props) => {
  const { content } = props;

  return <>{JSON.stringify(content)}</>;
};

const Basic: React.FC<{ content: any }> = ({ content }) => {
  return (
    <>
      <H1 src={"list"}> Заказы</H1>
      <main className={"between"}> {Array.isArray(content?.content) && <Component {...content} />}</main>
      <Pageable pages={content?.totalPages} />
    </>
  );
};

export default Basic;
