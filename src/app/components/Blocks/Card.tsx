import React, { FunctionComponent } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { mapCart } from "../../store/helper";
import { cartReducer } from "../../store/storeCart";
import { Icon } from "../Elements/Icon";
import { LINK } from "../Elements/Styled";
import { theme } from "../GlobalStyles";

type Props = ReturnType<typeof cartReducer>;
const Styled = styled.div`
  position: relative;

  .badge {
    background: ${theme.color.error};
    color: white;
    display: inline-block;
    min-width: 19px;
    padding: 2px;
    border-radius: 50%;
    font-size: 17px;
    text-align: center;
    bottom: 5px;
    right: 0;
    position: absolute;
  }

  @media (max-width: 992px) {
    .badge {
      border: 2px solid currentColor;
      min-width: 15px;
      bottom: 0px;
      right: 0;
    }
  }
`;

const Component: FunctionComponent<Props> = (prop) => {
  return (
    <LINK to="/cart">
      <Icon src={"cart"} />
      <Styled>{prop.cart.length > 0 && <span className="badge">{prop.cart.length}</span>}</Styled>
      {prop.children && <span>{prop.children}</span>}
    </LINK>
  );
};

const connectedComponent = connect(mapCart)(Component);
export { connectedComponent as Card };
