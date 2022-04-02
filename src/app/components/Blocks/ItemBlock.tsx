import axios from "axios";
import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { footerLinks, footerMessage } from "../../data";
import { IPage } from "../../store/Models";
import ItemPreview from "../Elements/ItemPreview";
import { ISmall } from "../Wrapper";
const Links = styled.div`
  margin: 12px;
  padding: 12px;
  display: flex;
  direction: row;
  justify-items: content;
  justify-content: center;
  a {
    font-size: 1.5rem;
    padding-left: 2rem;
    cursor: pointer;
    color: var(--secondary-color);
  }
`;
const Grid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, 180px);
  grid-column-gap: 18px;
  grid-row-gap: 20px;
  justify-content: center;
`;
const PageFooter = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  justify-items: center;
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
  }, [page]);
  if (!data) return null;
  const { content, number, totalPages, totalElements, ...over } = data as IPage;

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
          <a style={{ fontWeight: page === n ? 800 : 100 }} onClick={() => setPage(n)} key={"kkk" + n}>
            {n}
          </a>
        ))}
      </Links>
      <PageFooter>
        <div>
          <i>Страница {page} </i>
          <i>из {totalPages} </i>
        </div>

        <div>
          <i>Всего товаров в категории {totalElements} </i>
        </div>
      </PageFooter>
    </>
  );
};
export default Component;
