import React, { FunctionComponent, useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import { IItem } from "../../models/IFaces";
import { ButtonSecondary, Row } from "../Elements/Styled";
import ItemPreview from "./ItemPreview";
const Links = styled.div`
  margin: 12px;
  padding: 12px;
  display: flex;
  flex-direction: row;
  justify-content: center;

  button {
    padding: 0 4px;
  }
`;
const Grid = styled.div`
  justify-self: center;
  align-self: center;
  justify-items: stretch;
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(auto-fit, 280px);
`;

const Component: FunctionComponent<{ items: IItem[] }> = ({ items }) => {
  const pages = items.length / 20;
  const [page, setPage] = useState(1);
  const memoizedCallback = useCallback(() => {
    function arr() {
      const ar: number[] = [];
      for (let i = 0; i < pages; i++) ar.push(i + 1);
      return ar;
    }

    return arr();
  }, [pages]);

  const A = useMemo(() => {
    return <Grid>{items.map((item, key) => key >= (page - 1) * 20 && key < page * 20 && <ItemPreview key={item.id} {...item} />)}</Grid>;
  }, [page, items]);

  const B = useMemo(() => {
    return (
      <Links>
        {memoizedCallback().map((n) => (
          <ButtonSecondary outlined={page === n} onClick={() => setPage(n)} key={"kkk" + n}>
            {n}
          </ButtonSecondary>
        ))}
      </Links>
    );
  }, [page, memoizedCallback]);
  return (
    <>
      {A}

      {pages > 1 && (
        <>
          {B}
          <Row>
            <div>
              <i>Страница {page} </i>
              <i>из {pages} </i>
            </div>

            <div>
              <i>Всего товаров в категории {items.length} </i>
            </div>
          </Row>
        </>
      )}
    </>
  );
};
export default React.memo(Component);
