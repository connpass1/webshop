import { useEffect, useState } from "react";

export const maxSmallWidth = 720;
export const SERVERNAME = "http://192.168.1.239:8080";

export function useIsSmall() {
  const [small, setSmall] = useState(false);
  useEffect(() => {
    function handleResize() {
      setSmall(window.innerWidth < maxSmallWidth);
    }

    window.addEventListener("resize", handleResize);
    handleResize();
  });
  return small;
}

// export function useFetchingId(path?: string) {
//   const [status, setStatus] = useState(0);
//   const [data, setData] = useState();
//   const location = useLocation();
//   let url = `http://localhost:8080${location.pathname}`;
//   if (path) url = url + path;
//   console.log(url);
//   useEffect(() => {
//     setData(undefined);
//     setStatus(0);
//     axios
//       .get(url)
//       .then((res) => {
//         setData(res.data);
//         setStatus(200);
//         console.log("axios  " + url);
//       })
//       .catch((e) => {
//         setData(undefined);
//         setStatus(getErrorStatus(e));
//       });
//   }, [url]);
//   return { data: data as any, status: status };}


