import React from "react";
import { CSSProperties, Dispatch, FunctionComponent, ReactNode, SetStateAction, useState } from "react";

export interface RenderOptions {
  barHeight: number;
  barStyles: CSSProperties;
  burgerStyles: CSSProperties;
  handler: () => void;
  isToggled: boolean;
  margin: number;
  move: number;
  topOffset: number;
  width: number;
}
export interface CommonBurgerProps {
  onToggle?: (toggled: boolean) => any;
  toggle?: Dispatch<SetStateAction<boolean>>;
  toggled?: boolean;
}
export interface BurgerProps extends CommonBurgerProps {
  render: (o: RenderOptions) => ReactNode;
}

const size = 48;
const transition = "0.4s cubic-bezier(0, 0, 0, 1)";
const Burger = (({ onToggle, render, toggle, toggled }) => {
  const [toggledInternal, toggleInternal] = useState(false);
  const width = 32;
  const room = Math.round((size - width) / 2);
  const barHeightRaw = width / 12;
  const barHeight = Math.round(barHeightRaw);
  const margin = 9;
  const height = 12 + margin * 2;
  const topOffset = Math.round((size - height) / 2);
  const translate = 7.6675;
  const deviation = (barHeightRaw - barHeight) / 2;
  const move = parseFloat((width / translate - deviation / (4 / 3)).toFixed(2));

  const burgerStyles: CSSProperties = {
    cursor: "pointer",
    height: `36px`,
    position: "relative",
    transition: transition,
    userSelect: "none",
    width: `48px`,
  };

  const barStyles: CSSProperties = {
    background: "currentColor",
    height: `${barHeight}px`,
    left: `${room}px`,
    position: "absolute",
  };

  const toggleFunction = toggle || toggleInternal;
  const isToggled = toggled !== undefined ? toggled : toggledInternal;

  const handler = () => {
    toggleFunction(!isToggled);

    if (typeof onToggle === "function") onToggle(!isToggled);
  };

  return render({
    barHeight,
    barStyles,
    burgerStyles,
    handler,
    isToggled,
    margin,
    move,
    topOffset,
    width,
  });
}) as FunctionComponent<BurgerProps>;
const Toggle = ((props) => (
  <Burger
    {...props}
    render={(o) => (
      <div
        className="toggle"
        onClick={o.handler}
        style={{
          ...o.burgerStyles,
          transform: `${o.isToggled ? `rotateY(${180}deg)` : "none"}`,
        }}
        tabIndex={0}
      >
        <div
          style={{
            ...o.barStyles,
            width: `${o.width}px`,
            top: `${o.topOffset}px`,
            transition: transition,
            transform: `${o.isToggled ? `rotate(${-45}deg) translate(${o.move * -1}px, ${o.move}px)` : "none"}`,
          }}
        />

        <div
          style={{
            ...o.barStyles,
            width: `${o.width}px`,
            top: `${o.topOffset + o.barHeight + o.margin}px`,
            transition: transition,
            transform: `${o.isToggled ? `rotate(${45}deg) translate(${o.move * -1}px, ${o.move * -1}px)` : "none"}`,
          }}
        />
      </div>
    )}
  />
)) as FunctionComponent<CommonBurgerProps>;
export default Toggle;
