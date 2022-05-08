import React from "react";

export const Icon: React.FC<{ src?: string }> = ({ src }) => {
  if (!src) return null;
  if (src.length > 10) return <img src={src} alt="" />;
  else
    return (
      <svg className={"icon"}>
        <use xlinkHref={`/img/svg/_sprite.svg#${src}`} />
      </svg>
    );
};

export const H1: React.FC<{ src?: string }> = ({ src, children }) => {
  return (
    <h1>
      <Icon src={src} />
      {children}{" "}
    </h1>
  );
};
