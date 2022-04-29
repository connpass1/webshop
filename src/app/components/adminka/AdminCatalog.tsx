import React from "react";
import { ProfileModel } from "../../models/ProfileModel";
import { Column } from "../Elements/Styled";
import { Link } from "react-router-dom";
const Basic: React.FC<any>  = (props) => {
  const user  =new ProfileModel( props as ProfileModel)

  return <Column>
    <div><a href="mailto:${us.email}">{user.email}</a></div>
     <Link to={"/admin/profile/" + user.userId}>{user.name}</Link>
    <div>{user.address}</div>
    <div> <a href={`tel:+${user.phone}`}>+{user.phone}</a></div>
  </Column>;
};
export default Basic;