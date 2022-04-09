import React from "react";

export const Icon: React.FC<{ src?: string }> = ({ src }) => {
  if (!src) return null;
  else return <svg className={"icon"}>
    <use xlinkHref={`/img/sprite.svg#${src}`} />
  </svg>;
};