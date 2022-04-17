import React from "react";
import { Link } from "react-router-dom";
import { ISlug } from "../../models/IFases";
import { Icon } from "./Icon";

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
