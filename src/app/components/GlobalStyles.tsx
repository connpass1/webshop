import { createGlobalStyle } from "styled-components";
import { useEffect, useState } from "react";

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
    greyLight: "#e0e0e0"
  },
  size: {
    mobile: Sizes.mobile + "px",
    tablet: Sizes.tablet + "px",
    laptop: Sizes.laptop + "px",
    laptopL: Sizes.laptopL + "px",
    desktop: Sizes.desktop + "px"
  },
  shadow: "-1px 1px 12px -2px rgba(0, 0, 0, 0.6)",
  border: "1px solid rgba(0, 0, 0, 0.4)"
};
export const device = {
  mobile: `(max-width: ${theme.size.mobile})`,
  tablet: `(max-width: ${theme.size.tablet})`,
  laptop: `(max-width: ${theme.size.laptop})`,
  laptopL: `(max-width: ${theme.size.laptopL})`,
  desktop: `(max-width: ${theme.size.desktop})`
};

export function useIsSmall() {
  const [small, setSmall] = useState(false);
  useEffect(() => {
    function handleResize() {
      setSmall(window.innerWidth < Sizes.tablet);
    }

    window.addEventListener("resize", handleResize);
    handleResize();
  });
  return small;
}

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0
  }

  header {
    display: flex;
    color: ${theme.color.primary};
    border-bottom: ${theme.border};
    margin: 12px 0;
    @media ${device.tablet} {
      border: 0;
      margin: 0 ;
      justify-content: flex-end;
    }
  }

  h1, h2, h3 {
    padding: 0;
    margin-block-start: 0;
    margin-block-end: 10px;
    @media ${device.mobile} {
      margin-block-end: 0;
    };
    border-color: currentColor;
  }

  @media ${device.tablet} {
    main {
      font-size: 0.8rem;
      margin: 0;
      padding: 0;
    }

    nav {
      border-radius: 0;
      box-shadow: none;
    }
  }

  ;
  a {
    outline: none;
    text-decoration: none;
    color: currentColor;
    font-size: 1.2em;
    cursor: pointer;
  }

  button {
    border-radius: 8px;
    cursor: pointer;
    align-items: center;
    user-select: none;
    display: inline-flex;
    flex-wrap: nowrap;
    padding: 8px 12px;
    font-weight: 800;
    font-size: 1.2rem;
  }

  button:disabled {
    color: white;
    background-color: black;
    border-color: black;
    opacity: 0.6;
    cursor: initial;
  }

  button:focus {
    opacity: 0.8;
  }

  input,
  button,
  select,
  optgroup,
  textarea {
    margin: 0;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
    border: 1px solid ${theme.color.primary};
    border-radius: 4px;
  }

  input[type="text"], input[type="number"]:focus {
    border: 1px solid ${theme.color.secondary};
  }

  input, textarea {
    padding: 4px;
    max-width: 240px;
    margin-bottom: 12px;
    font-size: 1.2rem;
    margin-right: 2em;
  }

  button,
  input {
    overflow: visible;
  }

  button,
  select {
    text-transform: none;
  }

  button,
  html [type="button"],
  [type="reset"],
  [type="submit"] {
    -webkit-appearance: button;
  }

  ;
  button::-moz-focus-inner,
  [type="button"]::-moz-focus-inner,
  [type="reset"]::-moz-focus-inner,
  [type="submit"]::-moz-focus-inner {
    padding: 0;
    border-style: none;
  }

  ;
  footer {
    min-height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  ;
  main {
    grid-area: main;
    box-shadow: ${theme.shadow};
    padding: 10px;
    border-radius: 4px;
    user-select: text;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  main a {
    font-style: italic;
    outline: none;
    color: var(primary-color);
    font-size: 1.2em;
    white-space: nowrap;
    text-decoration: underline;
    text-decoration-thickness: 1px;
  }

  ;
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

  .icon {
    width: 1em;
    height: 1em;
    fill: none;
    stroke: currentColor;
    padding-right: 8px;
    align-self: center;
    justify-self: flex-end;
  }
`;
export default GlobalStyles;