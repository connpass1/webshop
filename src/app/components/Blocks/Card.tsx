import React, { FunctionComponent } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { BsCart } from "react-icons/bs";
import { mapCart } from "../../store/helper";
import { cartReducer } from "../../store/storeCart";
import { Link } from "react-router-dom";
type Props = ReturnType<typeof cartReducer>;
const Styled = styled.div`
  position: relative;
  margin-right: 0.5em;
  .badge {
    background: var(--primary-color);
    color: #ffffff;
    display: inline-block;
    min-width: 19px; /* em unit */
    padding: 2px; /* em unit */
    border-radius: 50%;
    font-size: 17px;
    text-align: center;
    top: -1.5em;
    right: -0.5em;
    position: absolute;
  }
  @media (max-width: 992px) {
    .badge {
      border: 2px solid currentColor;
      min-width: 17px;
      padding: 1px;
    }
  }
`;

const Component: FunctionComponent<Props> = (prop) => {
  return (
    <Link to="/cart" className="flex-center">
      <BsCart />
      <Styled>{prop.cart.length > 0 && <span className="badge">{prop.cart.length}</span>}</Styled>
      {prop.children && <span>{prop.children}</span>}
    </Link>
  );
};

const connectedComponent = connect(mapCart)(Component);
export { connectedComponent as Card };
