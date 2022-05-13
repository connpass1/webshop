import React, { useState } from "react";
import styled from "styled-components";
import { Icon } from "../components/Elements/Icon";
import { Image } from "../components/Elements/Image";
import { theme } from "../components/GlobalStyles";

const Main = styled.main``;
const GridItems = styled.div`
  padding: 12px;
  width: calc(100% - 24px);

  display: grid;
  grid-template-columns: min-content 3fr min-content min-content 40px;
  justify-self: stretch;
  font-size: 17px;
  gap: 0 12px;

  align-items: center;
  h2 {
    grid-column-start: 1;
    grid-column-end: 3;
  }
  h3 {
    grid-column-start: 1;
    grid-column-end: 1;
  }
`;
const Div1 = styled.div`
  flex-flow: row;
  display: flex;
  grid-column-start: 2;
  grid-column-end: 2;
`;
const Div2 = styled.div`
  flex-flow: row;
  display: flex;
  grid-column-start: 1;
  grid-column-end: 3;
`;
const Line = styled.div`
  border-bottom: 1px solid;
  border-image: radial-gradient(${theme.color.primary}, white) 5;
  border-image-outset: -0.5; /* 1.5 × 1.4rem = 2.1rem */
  box-sizing: border-box;
`;
const Dots = styled.div`
  background-image: linear-gradient(to right, ${theme.color.primary} 33%, white 0%);
  background-position: bottom;
  background-size: 5px 1px;
  background-repeat: repeat-x;
  width: 100%;
  height: 1.3em;
`;
const Section = styled.section`
  height: 480px;
  background-color: red;
`;

const GRIdSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 280px);
  gap: 12px;
  background-color: fuchsia;
  justify-self: stretch;
  width: calc(100% - 24px);
  justify-items: stretch;
  justify-content: space-evenly;
`;

const ImageGrid = styled.div`
  background-color: goldenrod;
  justify-self: stretch;
  display: flex;
  height: 280px;

  overflow-y: auto;
`;

const ItemGrid = styled.div`
  display: grid;
  justify-self: center;
  gap: 0 4px;
  width: calc(100% - 24px);
  background-color: darkkhaki;
`;
export const OL = styled.ol`
  justify-self: stretch;
  align-self: stretch;
  display: grid;
  grid-template-columns: repeat(auto-fill, 220px);
  justify-items: center;
  span,
  a {
    ${theme.font.Pattaya}
  }
  li {
    align-items: center;

    position: relative;
    ::marker {
      ${theme.font.Pattaya}
      font-size:0.8em;
    }
  }
`;
const HomePage: React.FC = (props) => {
  const [state, setState] = useState("");
  return (
    <Main>
      <h1>меню</h1>
      <OL>
        <li>iiiiiiii</li>
        <li>iiiiiiii</li>
        <li>iiiiiiii</li>
      </OL>

      <GridItems>
        <Div2 className="center">
          <h2>первые блюда</h2>
        </Div2>
        <h3>из мяса</h3>
        <Div1>
          <span>борщь</span>
          <Dots />
        </Div1>

        <div>250мл</div>
        <div>500р</div>
        <Icon src={"rect"} />
        <Div1>
          <span> щи </span>
          <Dots />
        </Div1>
        <div>250мл</div>
        <div>500р</div>
        <Icon src={"ok"} />
        <Div1>
          <span> харчо </span>
          <Dots />
        </Div1>
        <div>250мл</div>
        <div>500р</div>
        <Icon src={"ok"} />
        <h3>из рыбы </h3>
        <Div1>
          <span> уха </span>
          <Dots />
        </Div1>
        <div>250мл</div>
        <div>500р</div>
        <Icon src={"rect"} />
        <h3>овoщной </h3>
        <Div1>
          <span> окрошка </span>
          <Dots />
        </Div1>
        <div>250мл</div>
        <div>500р</div>
        <Icon src={"rect"} />
        <Div2 className="center">
          <h2>вторые блюда</h2>
        </Div2>

        <Div1>
          <span>борщь</span>
          <Dots />
        </Div1>

        <div>250мл</div>
        <div>500р</div>
        <Icon src={"ok"} />
        <Div1>
          <span> щи </span>
          <Dots />
        </Div1>

        <div>250мл</div>
        <div>500р</div>
        <Icon src={"rect"} />
      </GridItems>

      <h1> первые блюда </h1>
      <Div2 className="center">
        <h2> из мяса </h2>
      </Div2>
      <GRIdSection>
        <Section>
          <Image src="  " />
          <p>Название </p>
          <p> Цена </p>
          <p> кол-во </p>
          <p> короткое описание </p>
          <p>в корзину </p>
        </Section>
        <Section>dddd </Section>
        <Section>dddd </Section>
        <Section>ddddd</Section>
      </GRIdSection>
      <ItemGrid>
        <h1>Название</h1>
        <p> Цена </p>
        <p> кол-во </p>
        <p> короткое описание </p>

        <p>длинное описание </p>
        <p>ккал дж </p>
        <p>состав</p>
        <p>Наличие</p>
        <p>в корзину </p>
        <ImageGrid>
          <Image src="" /> <Image src="" /> <Image src="" /> <Image src="" /> <Image src="" /> <Image src="" /> <Image src="" />
        </ImageGrid>
      </ItemGrid>
    </Main>
  );
};
export default HomePage;
