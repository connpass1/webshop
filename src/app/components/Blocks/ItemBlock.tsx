import React, { FunctionComponent, useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import { IItem } from "../../store/Models";
import { ButtonSecondary } from "../Elements/Button";
import { FlexBetween } from "../Elements/Styled";
import ItemPreview from "./ItemPreview";

const Links = styled.div`
  margin: 12px;
  padding: 12px;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const Grid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, 320px);
  grid-column-gap: 18px;
  grid-row-gap: 20px;
  justify-content: center;
`;

const Component: FunctionComponent<{ items: IItem[] }> = ({ items }) => {
  const pages = items.length / 20;

  const [page, setPage] = useState(1);
  const memoizedCallback = useCallback(
    () => {
      function arr() {
        const ar: number[] = [];
        for (let i = 0; i < pages; i++) ar.push(i + 1);
        return ar;
      }

      return arr();
    },
    [pages]
  );
  const A = useMemo(
    () => <Grid>{items.map((item, key) => key >= (page - 1) * 20 && key < page * 20 &&
      <ItemPreview key={item.id} {...item} />)}</Grid>,
    [page, items, memoizedCallback()]
  );
  const B = useMemo(
    () => (
      <Links>
        {memoizedCallback().map((n) => (
          <ButtonSecondary outlined={page === n} onClick={() => setPage(n)} key={"kkk" + n}>
            {n}
          </ButtonSecondary>
        ))}
      </Links>
    ),

    [page, memoizedCallback]
  );
  return (
    <>
      {A}
      {B}

      <FlexBetween>
        <div>
          <i>Страница {page} </i>
          <i>из {pages} </i>
        </div>
        <div>
          <i>Всего товаров в категории {items.length} </i>
        </div>
      </FlexBetween>
    </>
  );
};

export default Component;
