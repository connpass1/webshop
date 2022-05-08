import classNames from "classnames";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { CategoryModel } from "../../../models/CategoryModel";
import { mapContent, PropsContent, PropsReq, useFetchLocation } from "../../../store/helper";
import { actionsContent } from "../../../store/storeContent";
import Breadcrumbs from "../../Blocks/Breadcrumbs";
import { H1, Icon } from "../../Elements/Icon";
import { Column, MainStart, Row } from "../../Elements/Styled";
import { theme } from "../../GlobalStyles";
import CatalogForm from "./CatalogForm";
import ContentUpdated from "./ContentUpdated";
import DeleteForm from "./DeleteForm";
export const Tabs = styled.div`
  user-select: none;
  justify-self: center;
  align-self: flex-end;
  display: grid;
  gap: 1px;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));

  .active {
    background-color: ${theme.color.primary};
  }
  button {
    color: white;
    padding: 8px;
    background-color: ${theme.color.grey};
    font-size: 1rem;
    font-weight: normal;
    :hover {
      // opacity: 0.9;
    }
  }
`;

const Component: React.FC<{
  category: CategoryModel;
  delContentRequest: PropsReq;
  saveContentRequest: PropsReq;
  status: number;
}> = ({ category, delContentRequest, saveContentRequest, status }) => {
  const handlerDelete = useCallback(() => delContentRequest({ id: category.id, url: "/delete/catalog" }), [delContentRequest, category]);

  const [state, setState] = useState(0);
  useEffect(() => {
    if (status === 201) {
      if (state === 0) setState(1);
    }
  }, [status]); // eslint-disable-line react-hooks/exhaustive-deps

  const children = useMemo(
    () => (
      <ol>
        {category?.childrenCategory.map((cat) => (
          <li key={cat.id}>
            <Link to={"/admin/catalog/" + cat.id}>
              <Icon src={cat.icon} />
              {cat.name}
            </Link>
          </li>
        ))}
      </ol>
    ),
    [category]
  );
  const memoModel = useMemo(() => {
    const cat = new CategoryModel(undefined);
    cat.parent = category.parent;
    return cat;
  }, []);

  return (
    <>
      <Tabs>
        <button className={classNames({ active: state === 0 })} onClick={() => setState(0)}>
          Создать
        </button>
        <button className={classNames({ active: state === 1 })} disabled={!category.parent} onClick={() => setState(1)}>
          Редактировать
        </button>
        <button className={classNames({ active: state === 2 })} disabled={!category.parent} onClick={() => setState(2)}>
          Удалить
        </button>
      </Tabs>

      {state === 1 && <CatalogForm category={category} saveContentRequest={saveContentRequest} />}
      {state === 0 && <CatalogForm category={memoModel} saveContentRequest={saveContentRequest} />}
      {state === 2 && (
        <DeleteForm req={handlerDelete} header="Удалить группу" caption={category.name}>
          {category.childrenCategory.length > 0 && (
            <Column>
              <Row> будут удалены подгруппы: </Row>
              {children}
            </Column>
          )}
        </DeleteForm>
      )}
      {category.childrenCategory.length === 0 && <Link to={"/admin/item/0/" + category.id}>добавить товар</Link>}
      {state !== 2 && children}
    </>
  );
};
const Component1: React.FC<PropsContent> = (props) => {
  useFetchLocation(props.contentRequest);
  const content = new CategoryModel(props.content);
  return (
    <>
      {props.status > 200 && <ContentUpdated />}
      <H1 src={content?.icon}>{content?.name}</H1>
      <MainStart>
        {props.status > 199 &&
          content &&
          (props.status === 202 ? (
            <p>Группа удалена</p>
          ) : (
            <Component
              category={content}
              saveContentRequest={props.saveContentRequest}
              delContentRequest={props.delContentRequest}
              status={props.status}
            />
          ))}
      </MainStart>
      <Breadcrumbs parent={content?.parent} isAdmin={true} />
    </>
  );
};
const FetchContent = connect(mapContent, actionsContent)(Component1);
export default FetchContent;
