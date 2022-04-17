import React, { CSSProperties, Dispatch, FunctionComponent, ReactNode, SetStateAction, useState } from "react";

export interface RenderOptions {
  barStyles: CSSProperties;
  burgerStyles: CSSProperties;
  handler: () => void;
  isToggled: boolean;
  margin: number;

  width: number;
}

export interface CommonBurgerProps {
  innerRef: React.MutableRefObject<null>;
  onToggle?: (toggled: boolean) => any;
  toggle?: Dispatch<SetStateAction<boolean>>;
  toggled?: boolean;
}

export interface BurgerProps extends CommonBurgerProps {
  render: (o: RenderOptions) => ReactNode;
}


const transition = "0.4s cubic-bezier(0, 0, 0, 1)";
const Burger = (({ onToggle, render, toggle, toggled }) => {
  const [toggledInternal, toggleInternal] = useState(false);
  const width = 36;
  const margin = 9;


  const burgerStyles: CSSProperties = {
    cursor: "pointer",
    height: `36px`,
    position: "relative",
    userSelect: "none",
    width: `36px`,
    margin: `12px 18px`
  };
  const barStyles: CSSProperties = {
    background: "currentColor",
    height: `4px`,
    left: `6px`,
    position: "absolute"
  };
  const toggleFunction = toggle || toggleInternal;
  const isToggled = toggled !== undefined ? toggled : toggledInternal;
  const handler = () => {
    toggleFunction(!isToggled);
    if (typeof onToggle === "function") onToggle(!isToggled);
  };
  return render({
    barStyles,
    burgerStyles,
    handler,
    isToggled,
    margin,
    width
  });
}) as FunctionComponent<BurgerProps>;


const Toggle = ((props) => (

  <Burger
    {...props}
    render={(o) => (
      <div
        ref={props.innerRef}
        className="toggle"
        onClick={o.handler}
        style={{
          ...o.burgerStyles,
          transition: transition,

          transform: `${o.isToggled ? `rotateY(${180}deg) translate( 0 , 4.6px)\`` : "none"}`
        }}
        tabIndex={0}
      >
        <div
          style={{
            ...o.barStyles,
            width: `${o.width}px`,
            top: `6px`,
            transition: transition,
            transform: `${o.isToggled ? `rotate( -45deg) translate(-4.6px, 4.6px)` : "none"}`
          }}
        />
        <div
          style={{
            ...o.barStyles,
            width: `${o.width}px`,
            top: `${10 + o.margin}px`,
            transition: transition,
            transform: `${o.isToggled ? `rotate( 45deg) translate(-4.6px,-4.6px)` : "none"}`
          }}
        />
      </div>
    )}
  />
)) as FunctionComponent<CommonBurgerProps>;
export default Toggle;
