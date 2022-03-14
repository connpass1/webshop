import { useEffect, useState } from "react";
export const maxSmallWidth = 992;
export function useIsSmall() {
  const [small, setSmall] = useState(false);
  useEffect(() => {
    function handleResize() {
      setSmall(window.innerWidth < maxSmallWidth);
    }

    window.addEventListener("resize", handleResize);
    console.log(window.innerWidth);
    handleResize();
    // Remove event listener on cleanup
  });
  return small;
}
