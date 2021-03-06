import React, { useMemo } from "react";
import styled from "styled-components";
import { ProfileModel } from "../../models/ProfileModel";
import { phone } from "../../store/helper";
import { Icon } from "../Elements/Icon";
import { theme } from "../GlobalStyles";
const Styled = styled.div`
  display: grid;
  gap: 4px;
  a {
    color: ${theme.color.secondary};
  }
`;
const Component: React.FC<{ user: ProfileModel }> = ({ user }) => {
  const phoneNumber = useMemo(() => phone(user.phone), [user]);
  if (!user.id) return null;
  return (
    <>
      <Styled>
        {user.email && (
          <a href={"mailto:" + user.email}>
            <Icon src="email" /> {user.email}
          </a>
        )}

        <a href={`tel:${user.phone}`}>
          <Icon src={"phone"} />
          {phoneNumber}
        </a>

        {user.address?.length > 0 && (
          <div>
            <b>адресс-</b> <i>{user.address}</i>
          </div>
        )}
      </Styled>
    </>
  );
};
export default Component;
