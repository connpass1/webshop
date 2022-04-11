import React, { useMemo } from "react";

const articular = (id: number) => {
  let art = "" + id;
  while (art.length < 6) art = "0" + art;
  return "код товара -" + art;
};
export const Articular: React.FC<{ val: number }> = ({ val }) => {
  const memo = useMemo(() =>
    <header>{articular(val)}</header>, [val]);
  return <>{memo}</>;
};