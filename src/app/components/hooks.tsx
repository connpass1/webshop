import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getErrorStatus } from "../store/saga";
export const maxSmallWidth = 992;
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

export function useFetchingId(path: string) {
  const [status, setStatus] = useState(0);
  const [data, setData] = useState();
  const location = useParams();
  const id = (location as any).id;

  const url = "http://localhost:3000/json/" + path.replace("XXXX", id);

  useEffect(() => {
    console.log("useFetchingGet");
    setData(undefined);
    setStatus(0);
    axios
      .get(url)
      .then((res) => {
        setData(res.data);
        setStatus(200);
        console.log("axios  " + url);
      })
      .catch((e) => {
        setData(undefined);
        setStatus(getErrorStatus(e));
        console.log(status);
      });
  }, [url]);
  return { data: data as any, status: status };
}
