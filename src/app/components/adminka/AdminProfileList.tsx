import React from "react";
import { Icon } from "../Elements/Icon";
import { ProfileModel } from "../../models/ProfileModel";
import Pageable from "../Blocks/Pageable";

const Basic: React.FC<any> = (props) => {
  const { content,    totalPages } = props;
  const users = content as ProfileModel[];
  return <>
    <h1><Icon src={"users"} /> Пользователи</h1>
    {users?.map(us => <p key={us.id}>
        телефон {us.phone} email {us.email} name {us.name} адресс {us.address}
      </p>
    )}
    <Pageable pages={totalPages} />ggggg
  </>;
};
export default Basic;