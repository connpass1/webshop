import axios from "axios";
import React, { useEffect, useState } from "react";
import { FunctionComponent } from "react";
import { Redirect, useParams } from "react-router-dom";
import { getErrorStatus } from "../store/saga";

const Component: FunctionComponent = () => {
  const location = useParams();
  const id = (location as any).id;
  const [data, setData] = useState();
  const [status, setStatus] = useState(0);
  useEffect(() => {
    setStatus(0);
    return () => {
      axios
        .get(`http://localhost:3000/json/catalog.json`)
        .then((res) => {
          setData(res.data);
          setStatus(200);
          console.log("axios 555");
        })
        .catch((e) => {
          console.log(e);
          setStatus(getErrorStatus(e));
        });
    };
  }, [id]);

  if (status > 200) return <Redirect to={"error/" + id}></Redirect>;
  return (
    <>
      <h1>ItemPage {id}</h1>
      {data && <p>{JSON.stringify(data)}</p>}
    </>
  );
};

export default Component;
