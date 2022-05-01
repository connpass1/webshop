import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ProfileModel } from "../../models/ProfileModel";
import { mapContent, PropsContent, useFetchLocation } from "../../store/helper";
import { actionsContent } from "../../store/storeContent";
import Pageable from "../Blocks/Pageable";
import { H1 } from "../Elements/Icon";
import { ChildrenGreed, GridTable, TD, TH } from "../Elements/Table";

const Greed = styled(GridTable)`
  grid-template-columns: min-content min-content 1fr 2fr min-content;
  grid-template-columns: min-content min-content 1fr 2fr min-content;
`;

const Component: React.FC<any> = (props) => {
  const { content } = props;
  const users = content as ProfileModel[];
  if (!Array.isArray(content)) return null;
  if (users.length < 1) return null;

  return (
    <Greed>
      <TH>N</TH>
      <TH>email</TH>
      <TH> логин</TH>
      <TH> адресс</TH>
      <TH> телефон</TH>
      {users?.map((us, n) => (
        <ChildrenGreed key={us.id}>
          <TD>{n + 1}</TD>
          <TD>
            <a href={"mailto:" + us.email}>{us?.email}</a>
          </TD>
          <TD>
            <Link to={"/admin/profile/" + us?.userId}>{us?.name}</Link>
          </TD>
          <TD>{us.address}</TD>
          <TD>
            <a href={`tel:+${us?.phone}`}>+{us?.phone}</a>
          </TD>
        </ChildrenGreed>
      ))}
    </Greed>
  );
};
const Component1: React.FC<PropsContent> = (props) => {
  useFetchLocation(props.contentRequest);
  const content = props.content;
  return (
    <>
      <H1 src={"users"}> Пользователи</H1>
      <main className={"start"}>
        {JSON.stringify(props.content)}
        {props.status > 199 && content && Array.isArray(content?.content) && <Component {...content} />}
      </main>
      <Pageable pages={content?.totalPages} />
    </>
  );
};
const FetchContent = connect(mapContent, actionsContent)(Component1);
export default FetchContent;
