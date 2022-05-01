import { createGlobalStyle, keyframes } from "styled-components";

export enum Sizes {
  mobile = 425,
  tablet = 768,
  laptop = 1024,
  laptopL = 1440,
  desktop = 1920,
}

export const theme = {
  color: {
    primary: "#5d4037",
    primaryLight: "#d7ccc8",
    secondary: "#00695c",
    secondaryLight: "#b2dfdb",
    error: "#e53935",
    grey: "#424242",
    greyLight: "#e0e0e0",
    disabled: "#888888",
  },
  size: {
    mobile: Sizes.mobile + "px",
    tablet: Sizes.tablet + "px",
    laptop: Sizes.laptop + "px",
    laptopL: Sizes.laptopL + "px",
    desktop: Sizes.desktop + "px",
  },
  shadow: "-1px 1px 12px -2px rgba(0, 0, 0, 0.6)",
  border: "1px solid rgba(0, 0, 0, 0.4)",
};
export const device = {
  mobile: `(max-width: ${theme.size.mobile})`,
  tablet: `(max-width: ${theme.size.tablet})`,
  laptop: `(max-width: ${theme.size.laptop})`,
  laptopL: `(max-width: ${theme.size.laptopL})`,
  desktop: `(max-width: ${theme.size.desktop})`,
};

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Roboto', sans-serif;
  }

  header {
    display: flex;
    color: ${theme.color.primary};
    border:none; 
  }

  .root {
    padding-bottom: 2px;
    border-bottom: 1px solid currentColor;
    margin-bottom: 8px;
  }

  h1, h2, h3 {
    grid-area: h;
    padding: 12px;
    margin-block-start: 0;
    border-bottom: 1px solid currentColor;
    justify-self: flex-start;
    display: flex;
    margin-block-end: 0;

    color: ${theme.color.primary};
    vertical-align: middle;
    margin-bottom: 12px;
    @media ${device.laptop} {
      padding: 8px;
    }
    @media ${device.tablet} {
      padding: 0 0 0.2em 0;
    }
  }

  h1 {
    line-height: 24px;
    height: 24px;

  }

  @media ${device.tablet} {
    nav {
      border-radius: 0;
      box-shadow: none;
    }
  }
 
.start{
  justify-content: start;
}
.between{
  justify-content: space-between;
}
.center{
  justify-items: center;
  justify-content: center;
  align-items: center;
  
}
.end{
  justify-content: flex-end;
}
  main {
    div{max-width:100%}
    grid-area: main;  
    border-radius: 4px;
    user-select: text;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    align-content: center;
    flex-wrap: wrap;
    justify-content:stretch;
    @media ${device.tablet} {
      font-size: 0.8rem;
      margin: 0;
      padding: 0;
    }

    a {
      font-style: italic;
      outline: none;
      color: var(primary-color);
      white-space: nowrap;
      text-decoration: underline;
    }
  }

  a {
    outline: none;
    text-decoration: none;
    color: currentColor;
    font-size: 1.2em;
    cursor: pointer;
  }

  button {
    cursor: pointer;
    align-items: center;
    user-select: none;
    display: inline-flex;
    flex-wrap: nowrap;
    padding: 8px 12px;
    font-weight: bolder;
    font-size: 1.2rem;
    white-space: nowrap;
  }

  button:disabled {
    color: white;
    background-color: black;
    border-color: black;
    opacity: 0.6;
    cursor: initial;
  }

  button,
  input {
    overflow: visible;
  }

  button,
  select {
    text-transform: none;
    justify-content: center;
  }

  footer {
    min-height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  .toggle {
    display: none;
    @media ${device.tablet} {
      display: block;
    }
  }


  hr {
    border-bottom: 1px solid currentColor;
    width: 100%;
    margin-top: 1em;
  }

  ;
  main a:hover,
  aside a:hover {
    text-shadow: 1px 0 0 currentColor;
  }

  .error {
    color: ${theme.color.error};
  }

  ;
  .icon {
    width: 1em;
    height: 1em;
    fill: none;
    stroke: currentColor;
    padding-right: 8px;
    align-self: center;
    justify-self: flex-end;
  }

  section {
    display: grid;
    box-shadow: ${theme.shadow};
    color: ${theme.color.primary};
    font-size: 1rem;
    border-radius: 8px;
    align-items: center; 
   
  }

  .price {
    grid-area: price;
    :after {
      content: " р."
    } ;
  }

`;
export default GlobalStyles;
export const outAnimation = keyframes`
  0% {
    left: 0;
    opacity: 1;
  }
  100% {
    left: -400px;
    opacity: 0.5;
  }
`;

export const inAnimation = keyframes`
  0% {
    left: -200px;
    opacity: 0.5;
  }
  100% {
    left: 0;
    opacity: 1;
  }
`;
