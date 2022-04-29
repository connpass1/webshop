import React from "react";
import { device, theme } from "../components/GlobalStyles";
import styled from "styled-components";
import { Children } from "../components/Elements/Table";

const Styled = styled.div`
  background-color: ${theme.color.greyLight};
  grid-template-columns: 1fr 3fr 3fr;
  display: inline-grid;
  width: 720px;
  justify-self: center;
  gap: 1px;
  padding: 1px;
  @media ${device.tablet} {
  }
`;
const Main = styled.main`
  grid-template-columns: max-content;
  display: inline-grid;
  @media ${device.tablet} {
  }
`;
const THEAD = styled(Styled)`
  div {
    background-color: ${theme.color.grey};
    color: white;
    text-align: center;
    padding: 4px;
    font-weight: bolder;
  }
`;
const TROW = styled(Styled)`
  div {
    background-color: white;
    color: black;
    padding: 2px;
  }
;
`;
const arr = [{ "i": "gggggg", "n": 0 },
  { "i": "gggggg", "n": 0 },
  { "i": "gggggg", "n": 0 },
  { "i": "gggggg", "n": 0 },
  { "i": "gggggg", "n": 0 },
  { "i": "gggggg", "n": 0 },
  { "i": "gggggg", "n": 0 },
  { "i": "gggggg", "n": 0 },
  { "i": "gggggg", "n": 0 },
  { "i": "gggggg", "n": 0 },
  { "i": "gggggg", "n": 0 }

];


const HomePage: React.FC = (props) => {
  const s = <TROW>
    <div>bbb</div>
    <div>111b</div>
    <div>222</div>
  </TROW>;
  return <>

    <Main>
      <THEAD>
        {
          arr.map((h) => <Children>
              <div>{h.i}</div>
              <div>{h.n}</div>
              <div>{h.i}</div>
            </Children>
          )
        }


      </THEAD>
      {s}{s}{s}

    </Main>


  </>;
};
export default HomePage;

