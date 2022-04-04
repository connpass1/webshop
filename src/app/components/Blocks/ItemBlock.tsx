import axios from "axios";
import React, { useEffect, useState } from "react";
import { FunctionComponent } from "react";
import styled from "styled-components";
import { IPage } from "../../store/Models";
import { ButtonSecondary } from "../Elements/Button";
import { FlexBetween } from "../Elements/Styled";
import ItemPreview from "./ItemPreview";
const Links = styled.div`
  margin: 12px;
  padding: 12px;
  display: flex;
  direction: row;
  justify-content: center;
`;
const Grid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, 180px);
  grid-column-gap: 18px;
  grid-row-gap: 20px;
  justify-content: center;
`;

const Component: FunctionComponent<{ categoryId: number }> = ({ categoryId }) => {
  const [data, setData] = useState<any>();
  const [page, setPage] = useState(1);
  useEffect(() => {
    setData(undefined);
    const url = `http://localhost:8080/item/cat/${categoryId}/${page - 1}`;
    console.log("y " + url);
    axios
      .get(url)
      .then((res) => setData(res.data))
      .catch((e) => {
        console.log(e);
        setData(undefined);
      });
  }, [page, categoryId]);
  if (!data) return null;
  const { content, totalPages, totalElements } = data as IPage;

  const arr = [];
  for (var i = 0; i < totalPages; i++) arr.push(i + 1);
  return (
    <>
      <Grid>
        {content.map((item) => (
          <ItemPreview key={item.id} {...item} />
        ))}
      </Grid>
      <Links>
        {arr.map((n) => (
          <ButtonSecondary outlined={page === n} onClick={() => setPage(n)} key={"kkk" + n}>
            {n}
          </ButtonSecondary>
        ))}
      </Links>
      <FlexBetween>
        <div>
          <i>Страница {page} </i>
          <i>из {totalPages} </i>
        </div>

        <div>
          <i>Всего товаров в категории {totalElements} </i>
        </div>
      </FlexBetween>
    </>
  );
};
export default Component;
