import React from "react";
import { Link } from "react-router-dom";
import { IEntity } from "../../models/IFases";
import { Icon } from "./Icon";

export const CatalogLink: React.FC<{ item: IEntity, onClick?: any }> = ({ item, onClick }) => {
  const handle = () => {
    if (onClick) onClick();
  };
  if (!item.id) return <Link to={`/${item.id}/${item.id}`}>{item.name}</Link>;
  return (
    <Link to={`/catalog/${item.id}`} style={{ paddingRight: "0.8em" }} onClick={handle}>
      <Icon src={item.icon} />
      {item.name}
    </Link>
  );
};
