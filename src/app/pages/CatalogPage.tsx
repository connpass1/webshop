import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { Breadcrumbs } from "../components/Blocks/Breadcrumbs";

import ItemBlock from "../components/Blocks/ItemBlock";
import { ICatalog, ISlug } from "../models/IFases";
import { H1, Icon } from "../components/Elements/Icon";
import { theme } from "../components/GlobalStyles";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { mapContent, PropsContent, useFetchLocation } from "../store/helper";
import { connect } from "react-redux";
import { actionsContent } from "../store/storeContent";

const Main = styled.main`
  justify-items: stretch;
  justify-content: stretch;

  div {
    max-width: 100%
  }
`;
const Styled = styled.div`
  display: grid;

  grid-template-columns: repeat(auto-fill, minmax(180px, min-content));
  grid-auto-flow: row dense;
  margin: 12px 0;
  justify-self: center;
  align-content: center;
  justify-content: space-around;
  color: ${theme.color.secondary};

  .gr {
    display: flex;
    flex-direction: column;
    margin: 12px 12px;
    padding: 6px;
    border: 1px solid green;
  }

  .gr {

    border: 1px solid green;
  }

  cr {
    display: flex;
    flex-direction: column;
    margin: 12px 12px;
    padding: 6px;
  }
;

  a {
    font-size: 1rem;
    text-decoration: none;
    font-weight: 400;;
  }
`;


export const CatalogLink: React.FC<{ item: ISlug, onClick?: any, className?: string }>
  = ({ item, onClick, className = "catLink" }) => {
  const handle = () => {
    if (onClick) onClick();
  };
  if (!item.id) return <Link to={`/${item.id}/${item.id}`}>{item.name} </Link>;
  return (
    <Link to={`/catalog/${item.id}`} onClick={handle} className={className}>
      <Icon src={item.icon} />
      {item.name}
    </Link>
  );
};

const Component: FunctionComponent<any> = (props) => {
  const catalog = props as ICatalog;
  if (!catalog) return <>{JSON.stringify(props)}</>;
  return (
    <> <Breadcrumbs parent={catalog.parent} />
      <H1 src={catalog.icon}> {catalog.name}</H1>
      <Main>
        <Styled>
          {catalog.childrenCategory?.map((cat) =>
            <div className={classNames("cr", { "gr": cat.childrenCategory?.length > 0 })} key={cat.id}>
              <CatalogLink key={cat.id} item={cat}
                           className={classNames({ "root": cat.childrenCategory?.length > 0 })} />
              {cat.childrenCategory?.map((inner) =>
                <CatalogLink key={inner.id} item={inner} />)}
            </div>)}
        </Styled>
        {catalog.items?.length > 0 && <ItemBlock items={catalog.items} />}
      </Main>
    </>
  );
};
const Component1: React.FC<PropsContent> = (props) => {
  useFetchLocation(props.contentRequest);
  if (props.status < 200) return null;
  if (!props.content) return null;
  return <Component {...props.content} />;
};
const FetchContent = connect(mapContent, actionsContent)(Component1);
export default FetchContent;
