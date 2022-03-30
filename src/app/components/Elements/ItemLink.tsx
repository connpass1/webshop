import React from "react";
import { Link } from "react-router-dom";
import { IEntity } from "../../store/Models";
export const CatalogLink: React.FC<{ item: IEntity }> = ({ item }) => {
  if (!item.id) return <Link to={`/${item.id}/${item.id}`}>{item.name}</Link>;
  return (
    <Link to={`/catalog/${item.id}`} style={{ paddingRight: "0.8em" }}>
      <i className={item.icon}> </i>
      {item.name}
    </Link>
  );
};
