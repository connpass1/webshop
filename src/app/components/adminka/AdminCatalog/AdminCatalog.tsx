import classNames from "classnames";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { CategoryModel, createCategoryModel } from "../../../models/CategoryModel";
import { mapContent, PropsContent, PropsReq, useFetchLocation } from "../../../store/helper";
import { actionsContent } from "../../../store/storeContent";
import Breadcrumbs from "../../Blocks/Breadcrumbs";
import { H1, TextIcon } from "../../Elements/Icon";
import { Column, MainStart, Row } from "../../Elements/Styled";
import { device, theme } from "../../GlobalStyles";
import CatalogForm from "./CatalogForm";
import ContentUpdated from "./ContentUpdated";
import DeleteForm from "./DeleteForm";
export const OL = styled.ol`
  justify-self: stretch;
  align-self: stretch;
  display: grid;
  grid-template-columns: repeat(auto-fill, 220px);
  min-width: 400px;
  @media ${device.tablet} {
    min-width: 80vw;
    justify-self: center;
  }

  span,
  a {
    ${theme.font.Pattaya}
    color: ${theme.color.primary}
  }
  li {
    align-items: center;

    position: relative;
    ::marker {
      ${theme.font.Pattaya}
      font-size:0.8em;
      display: inline-block;
      vertical-align: middle;
    }
  }
`;

const LinkItem = styled(Link)`
  color: ${theme.color.secondary};
`;
const LinkSecondary = styled(Link)`
  color: ${theme.color.secondary};
`;

export const Tabs = styled.div`
  user-select: none;
  justify-self: center;
  align-self: flex-end;
  display: grid;
  gap: 1px;
  grid-auto-flow: column;
  margin: 0 4px 12px 12px;
  overflow-x: auto;
  .active {
    border-bottom: 2px solid currentColor;
  }
  button {
    color: ${theme.color.primary} !important;
    padding: 8px;
    background-color: white;
    font-size: 1rem;
    font-weight: bold;
    border-bottom: 2px solid white;

    :disabled {
      background-color: white;
      color: ${theme.color.disabled} !important;
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

  const childrenItems = useMemo(() => {
    if (category?.items?.length > 0)
      return (
        <>
          {category?.items.map((cat) => (
            <li key={cat.id}>
              <Row>
                <Link to={"/admin/item/" + cat.id}>
                  <TextIcon {...cat} />
                </Link>
              </Row>
            </li>
          ))}
        </>
      );
    return null;
  }, [category]);
  const childrenCategory = useMemo(() => {
    if (category?.childrenCategory?.length > 0)
      return (
        <>
          {category?.childrenCategory.map((cat) => (
            <li key={cat.id}>
              <Row>
                <Link to={"/admin/catalog/" + cat.id}>
                  <TextIcon {...cat} />
                </Link>
              </Row>
            </li>
          ))}
        </>
      );
    return null;
  }, [category]);

  const [state, setState] = useState(!!childrenItems ? 1 : 0);
  useEffect(() => {
    if (status === 201) {
      if (state === 0) setState(1);
    }
  }, [status]); // eslint-disable-line react-hooks/exhaustive-deps
  const memoModel = useMemo(() => {
    const cat = new CategoryModel(undefined);
    cat.parent = category.parent;
    return cat;
  }, [category]);

  return (
    <>
      <Tabs>
        <button className={classNames({ active: state === 0 })} disabled={!!childrenItems} onClick={() => setState(0)}>
          Создать
        </button>
        <button className={classNames({ active: state === 1 })} disabled={category.parent.length === 0} onClick={() => setState(1)}>
          Редактировать
        </button>
        <button className={classNames({ active: state === 2 })} disabled={!category.parent.length} onClick={() => setState(2)}>
          Удалить
        </button>
      </Tabs>

      {state === 1 && <CatalogForm category={category} saveContentRequest={saveContentRequest} />}
      {state === 0 && <CatalogForm category={memoModel} saveContentRequest={saveContentRequest} />}
      {state === 2 && (
        <DeleteForm req={handlerDelete} header="Удалить группу:" caption={category.name}>
          {childrenItems && (
            <Column>
              <h3> будут удалены товары: </h3>
              <OL>{childrenItems}</OL>
            </Column>
          )}
          {childrenCategory && (
            <Column>
              <h3> будут удалены подгруппы: </h3>
              <OL> {childrenCategory}</OL>
            </Column>
          )}
        </DeleteForm>
      )}
      {state !== 2 && (
        <OL>
          {childrenCategory ? (
            <>
              <span>Подгрупп в группе: {category.childrenCategory.length}</span>
              {childrenCategory}
            </>
          ) : (
            <>
              <span>Товаров в группе: {category.items.length}</span>
              {childrenItems}
              <span>
                <LinkSecondary to={"/admin/item/0/" + category.id}>добавить товар</LinkSecondary>
              </span>
            </>
          )}
        </OL>
      )}
    </>
  );
};

const Component1: React.FC<PropsContent> = (props) => {
  useFetchLocation(props.contentRequest);

  const model = createCategoryModel(props.content);
  if (!model) return null;
  return (
    <>
      {props.status > 200 && <ContentUpdated />}

      <H1 src={model.icon}>{model.name}</H1>
      <MainStart>
        {props.status > 199 &&
          (props.status === 202 ? (
            <p>Группа удалена</p>
          ) : (
            <Component
              category={model}
              saveContentRequest={props.saveContentRequest}
              delContentRequest={props.delContentRequest}
              status={props.status}
            />
          ))}
      </MainStart>
      <Breadcrumbs parent={model.parent} isAdmin={true} />
    </>
  );
};
const FetchContent = connect(mapContent, actionsContent)(Component1);

export default FetchContent;
