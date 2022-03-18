import React from "react";
import { Link } from "react-router-dom";
import { IEntity } from "../../store/Models";
export const ItemLink: React.FC<{ item: IEntity }> = ({ item }) => {
  if (!item.slug) return <Link to={`/${item.slug}/${item.id}`}>{item.name}</Link>;
  return <Link to={`/${item.slug}/${item.id}`}>{item.name}</Link>;
};
