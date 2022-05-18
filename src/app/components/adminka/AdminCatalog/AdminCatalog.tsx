import React, { useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { CategoryModel, createCategoryModel } from "../../../models/CategoryModel";
import { PropsContent, PropsReq } from "../../../store/helper";
import Breadcrumbs from "../../Blocks/Breadcrumbs";
import { H1, TextIcon } from "../../Elements/Icon";
import { Column, MainStart, Row } from "../../Elements/Styled";
import { device, theme } from "../../GlobalStyles";
import CatalogForm from "./CatalogForm";
import DeletedContent from "./DeletedContent";
import DeleteForm from "./DeleteForm";
import Tabs from "./Tabs";
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
export const LinkSecondary = styled(Link)`
  color: ${theme.color.secondary};
  ${theme.font.Pattaya};
  font-size: 1.2rem;
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

  const list = useMemo(() => {
    const links = [
      <LinkSecondary to={"/admin/catalog/0/" + category.id}>добавить подгруппу</LinkSecondary>,
      <LinkSecondary to={"/admin/item/0/" + category.id}>добавить товар</LinkSecondary>,
    ];
    return (
      <>
        {childrenCategory ? (
          <>
            <OL>
              <span>Подгрупп в группе: {category.childrenCategory.length}</span>
              {childrenCategory}
            </OL>
            {links[0]}
          </>
        ) : (
          <>
            <OL>
              <span>Товаров в группе: {category.items.length}</span>
              {childrenItems}
            </OL>
            {links[1]}
          </>
        )}
        {!childrenCategory && !childrenItems && <>{links[0]}</>}
      </>
    );
  }, [category]);
  if (category.id === 0) return <CatalogForm category={category} saveContentRequest={saveContentRequest} />;
  return (
    <Tabs status={status}>
      {list}

      <CatalogForm category={category} saveContentRequest={saveContentRequest} />
      <DeleteForm req={handlerDelete} caption={category.name}>
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
    </Tabs>
  );
};

const Component1: React.FC<PropsContent> = (props) => {
  if (props.status === 202) return <DeletedContent />;
  const model = createCategoryModel(props.content);
  if (!model) return null;

  return (
    <>
      <H1 src={model.name.length > 0 ? model.icon : "edit"}>
        {model.name.length < 2 ? (
          <>
            Создать&nbsp;подгруппу в&nbsp; <q>{model.getParentName()}</q>
          </>
        ) : (
          model.name
        )}
      </H1>
      <MainStart>
        <Component
          category={model}
          saveContentRequest={props.saveContentRequest}
          delContentRequest={props.delContentRequest}
          status={props.status}
        />
      </MainStart>
      <Breadcrumbs parent={model.parent} isAdmin={true} />
    </>
  );
};

export default Component1;
