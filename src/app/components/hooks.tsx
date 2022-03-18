import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
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

export function useFetchingId() {
  const [status, setStatus] = useState(0);
  const [data, setData] = useState();
  const location = useLocation();

  const id = (location as any).id;
  const url = `http://localhost:3000/json${location.pathname}.json`.replace("/.json", ".json");
  console.log(url);

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
