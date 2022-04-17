import React from "react";
import { Link } from "react-router-dom";

const HomePage: React.FC = (props) => {
  return <>
    <Link to={"/admin/page/0"}> создать статью</Link>
    <Link to={"/admin/profiles/1"}> пользователь</Link>
    <Link to={"/admin/item/1"}> создать товар</Link>
    <Link to={"/admin/profiles/1"}> список пользователей</Link>
    <Link to={"/admin/items/1"}> список товаров</Link>
    <Link to={"/admin/pages"}> список статей</Link>
    <hr />
  </>;
};
export default HomePage;