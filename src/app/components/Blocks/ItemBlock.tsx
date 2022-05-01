import React, { FunctionComponent, useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import { IItem } from "../../models/IFases";
import { ButtonSecondary } from "../Elements/Button";
import { Row } from "../Elements/Styled";
import ItemPreview from "./ItemPreview";
import { device } from "../GlobalStyles";
const Links = styled.div`
  margin: 12px;
  padding: 12px;
  display: flex;
  flex-direction: row;
  justify-content: center;

  button {
    padding: 0 4px
  }
`;
const Grid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, 380px);
  gap: 20px;
  justify-content: center;
  @media ${device.desktop} {
    grid-template-columns: repeat(auto-fill, 380px);
    gap: 40px;;
  };
  @media ${device.laptopL} {
    grid-template-columns: repeat(auto-fill, 380px);
    gap: 20px;;
  };

  @media ${device.laptop} {
    grid-template-columns: repeat(auto-fill, 90%);
    gap: 24px 5%;;
  };
  @media ${device.tablet} {
    grid-template-columns: repeat(auto-fill, 100%);
    gap: 24px 0;
  }
`;
const Component: FunctionComponent<{ items:  IItem[] }> = ({ items }) => {
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

  function f(items:  IItem[], page: number) {
    return <Grid>{items.map((item, key) => key >= (page - 1) * 20 && key < page * 20 &&
      <ItemPreview key={item.id} {...item} />)}</Grid>;
  }

  const A = useMemo(
    () => f(items, page),
    [page, items]
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
      <Row className={"between"}  >
        <div>
          <i>Страница {page} </i>
          <i>из {pages} </i>
        </div>
        <div>
          <i>Всего товаров в категории {items.length} </i>
        </div>
      </Row>
    </>
  );
};
export default React.memo(Component);
