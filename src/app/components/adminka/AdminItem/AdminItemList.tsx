import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { IItem } from "../../../models/IFaces";
import Pageable from "../../Blocks/Pageable";
import { H1, Icon } from "../../Elements/Icon";
import { ChildrenGreed, GridTable, TD, TH } from "../../Elements/Table";
import { device } from "../../GlobalStyles";

const Catalog: React.FC<{ name?: string }> = ({ name }) => {
  if (!name) return null;
  const arr = name.split("@");
  return (
    <TD>
      <Link to={"/admin/catalog/" + arr[1]}>
        <Icon src={arr[2]} />
        {arr[0]}
      </Link>
    </TD>
  );
};

const Articular: React.FC<{ id: number }> = ({ id }) => {
  let s = "" + id;
  while (s.length < 6) {
    s = "0" + s;
  }
  return <TD>{s}</TD>;
};
const Greed = styled(GridTable)`
  grid-template-columns: 90px 1fr 1fr 60px 80px;
  justify-content: center;
  @media ${device.tablet} {
    grid-template-columns: 40px min-content min-content 40px min-content;
  }
`;
const Component: React.FC<any> = (props) => {
  const { content } = props;
  const items = content as IItem[];
  const memo = useMemo(
    () =>
      items.map((item) => (
        <ChildrenGreed key={item.id}>
          <Articular id={item?.id} />
          <TD>
            <Link to={"/admin/item/" + item?.id}>
              <Icon src={item?.icon} /> {item?.name}
            </Link>
          </TD>
          <Catalog name={item?.parent.name} />
          <TD>{item?.quantity} </TD>
          <TD>
            <span className={"price"}>{item?.price}</span>
          </TD>
        </ChildrenGreed>
      )),
    [items]
  );
  return (
    <>
      <Greed>
        <TH>артикул</TH>
        <TH> наименоваеие</TH>
        <TH> каталог</TH>
        <TH> кол-во</TH>
        <TH> цена</TH>
        {memo}
      </Greed>
    </>
  );
};

const Basic: React.FC<{ content?: any }> = ({ content }) => {
  return (
    <>
      <H1 src="list"> Товар</H1>
      <main>{Array.isArray(content?.content) && <Component {...content} />} </main>
      <Pageable pages={content?.totalPages} />
    </>
  );
};

export default Basic;
