import React, { FunctionComponent } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { mapCart } from "../../store/helper";
import { cartReducer } from "../../store/storeCart";
import { Icon } from "../Elements/Icon";
import { LINK } from "../Elements/Styled";
import { device, theme } from "../GlobalStyles";

type Props = ReturnType<typeof cartReducer>;
const Styled = styled.div`
  position: relative;

  .badge {
    background: ${theme.color.error};
    color: white;
    display: inline-block;
    min-width: 16px;
    min-height: 16px;
    padding: 2px;
    border-radius: 50%;
    font-size: 12px;
    text-align: center;
    top: -2em;
    right: -4px;
    position: absolute;
    @media ${device.tablet} {
      padding: 2px;
      top: -1.8em;

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
