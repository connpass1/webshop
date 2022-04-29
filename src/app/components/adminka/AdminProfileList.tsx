import React from "react";
import { H1 } from "../Elements/Icon";
import { ProfileModel } from "../../models/ProfileModel";
import Pageable from "../Blocks/Pageable";
import { Link } from "react-router-dom";
import { Children, GridTable, TD, TH } from "../Elements/Table";
import styled from "styled-components";
import { mapContent, PropsContent, useFetchLocation } from "../../store/helper";
import { connect } from "react-redux";
import { actionsContent } from "../../store/storeContent";

const Greed = styled(GridTable)`
  grid-template-columns: min-content min-content 1fr 2fr min-content;
  grid-template-columns: min-content min-content 1fr 2fr min-content;
`;

const Component: React.FC<any> = (props) => {
  const { content, totalPages } = props;
  const users = content as ProfileModel[];
  if (!Array.isArray(content)) return null;
  if (users.length < 1) return null;

  return <>
      <Greed>
        <TH>N</TH>
        <TH>email</TH>
        <TH> логин</TH>
        <TH> адресс</TH>
        <TH> телефон</TH>
        {users?.map((us,n) => <Children key={us.id}>
          <TD>{n+1}</TD>
          <TD><a href={"mailto:" + us.email  }>{us?.email}</a></TD>
          <TD><Link to={"/admin/profile/" + us?.userId}>{us?.name}</Link></TD>
          <TD>{us.address}</TD>
          <TD><a href={`tel:+${us?.phone}`}>+{us?.phone}</a></TD>
        </Children>)}
      </Greed>
      <Pageable pages={totalPages} />
  </>;
};
const Component1: React.FC<PropsContent> = (props) => {
  useFetchLocation(props.contentRequest);
  return <> <H1 src={"users"}> Пользователи</H1>
    < main className={"between"}>
      {JSON.stringify(props.content)}
      {props.status > 199 && props.content && Array.isArray(props.content?.content) && <Component {...props.content} />}
    </main>
  </>;
};
const FetchContent = connect(mapContent, actionsContent)(Component1);
export default FetchContent;