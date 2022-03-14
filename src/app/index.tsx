import React from "react";

import { initialize } from "./take-0/create-store";
import { Person } from "./person";
import { Provider } from "react-redux";
import Wrapper from "./components/Wrapper";

const store = initialize();

const component: React.FC = () => (
  <Provider store={store}>
    <Wrapper>
      <h1>DEMO Redux Saga Typescript</h1>
      <Person caption="Take-0" />
    </Wrapper>
  </Provider>
);

export { component as App };
