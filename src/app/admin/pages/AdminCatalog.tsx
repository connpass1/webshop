import React, { FunctionComponent, useState } from "react";
import styled from "styled-components";
import { CheckFetching } from "../../components/Fetching";
import { useFetchingId } from "../../components/hooks";
import { ICatalog } from "../../store/Models";
import { Parent } from "../../components/Elements/Parent";
import { Link, useLocation } from "react-router-dom";

import { Button } from "../../components/Elements/Button";
import axios from "axios";
const StyledFigure = styled.aside`
  color: #000;
  padding: 4px;
  width: 100%;
  figcaption {
    color: var(--primary-color);
    display: flex;
    justify-content: flex-end;
    padding: 8px;
    border-bottom: var(--border);
    margin-bottom: 12px;
  }
`;

const StyledForm = styled.div`
  padding: 12px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-content: space-around;
  justify-content: space-evenly;
  align-items: flex-start;
  > div {
    margin-bottom: 12px;
  }
  input {
    width: 120px;
    padding: 12px 20px;
    box-sizing: border-box;
  }
`;

const Edit: FunctionComponent<ICatalog> = (prop) => {
  const [state, setState] = useState<ICatalog>(prop);
  const handler = (event: { target: { name: string | number; value: any } }) => {
    const st = { ...state } as any;
    st[event.target.name] = event.target.value;
    setState(st as ICatalog);
  };
  const location = useLocation();
  let url = `http://localhost:8080${location.pathname}`;
  const handleDelete = () => {
    console.log(url);

    axios
      .delete(url)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const handleSave = () => {
    console.log(url);

    axios
      .post(url, {
        state,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <form>
      <StyledForm>
        <div>
          <input name="name" value={state.name} onChange={handler}></input>
        </div>
        <div>
          <textarea cols={50} rows={5} name="icon" value={state.icon} onChange={handler}></textarea>
        </div>

        <Button onClick={handleSave}> применить </Button>
        <Button onClick={handleDelete}> удалить </Button>
      </StyledForm>
    </form>
  );
};

const Component: FunctionComponent = () => {
  const { status, data } = useFetchingId();
  const catalog = data as ICatalog;

  if (!data) return null;

  return (
    <CheckFetching status={status}>
      <StyledFigure>
        <figcaption>
          <Link to={`/admin/catalog/${catalog.id}`}>
            <i className={catalog.icon}> </i>
            {catalog.name}
          </Link>
        </figcaption>
        <ul>
          {catalog.childrenCategory?.map((cat) => (
            <li key={cat.id}>
              <Link to={`/admin/catalog/${cat.id}`}>
                <i className={cat.icon}> </i>
                {cat.name}
              </Link>
            </li>
          ))}
        </ul>
        <Edit {...catalog}></Edit>
      </StyledFigure>
    </CheckFetching>
  );
};

export default Component;
