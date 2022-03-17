import axios from "axios";
import React, { useEffect, useState } from "react";
import { FunctionComponent } from "react";
import { Redirect, useParams } from "react-router-dom";
import { getErrorStatus } from "../store/saga";
import { CheckFetching } from "./ErrorPage";

const Component: FunctionComponent = () => {
  const location = useParams();
  const id = (location as any).id;
  const [data, setData] = useState();
  const [status, setStatus] = useState(0);
  useEffect(() => {
    console.log("effect");

    setData(undefined);
    setStatus(0);
    axios
      .get(`http://localhost:3000/json/items/${id}.json`)
      .then((res) => {
        setData(res.data);
        setStatus(200);
        console.log("axios 555");
      })
      .catch((e) => {
        setData(undefined);
        setStatus(getErrorStatus(e));
      });
  }, [location]);

  return (
    <CheckFetching status={status}>
      <h1>ItemPage {id}</h1>
      {data && <p>{JSON.stringify(data)}</p>}
    </CheckFetching>
  );
};

export default Component;
