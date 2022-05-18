import { createGlobalStyle, keyframes } from "styled-components";

export enum Sizes {
  mobile = 425,
  tablet = 768,
  laptop = 1024,
  laptopL = 1440,
  desktop = 1920,
}

export const theme = {
  font: {
    cursive: `font-family: 'Bad Script', cursive !important; font-weight: 400;`,
    Pattaya: `font-family: 'Pattaya', sans-serif !important; font-weight: 400;`,
    Bold: `font-family: 'Oswald', sans-serif !important; font-weight:700; `,
    Roboto: `font-family: "Roboto", sans-serif; font-weight:400;`,

    //font-family: 'Bad Script', cursive;
    //font-family: 'Oswald', sans-serif;
    //font-family: 'Pattaya', sans-serif;
    //font-family: 'Roboto', sans-serif;
  },
  color: {
    primary: "#5d4037",
    primaryLight: "#d7ccc8",
    secondary: "#00695c",
    secondaryLight: "#b2dfdb",
    error: "#e53935",
    grey: "#424242",
    greyLight: "#bbb",
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
  

  header {
    display: flex;
    color: ${theme.color.primary};
    border:none; 
  }


.center {
  justify-content: center;
  align-items: center;
  align-self: center;
}
 

h1{
 
 ${theme.font.Bold} ;
}
h2, h3  {
  ${theme.font.Pattaya} ;
 
   
}
  h1, h2, h3 {
 grid-area:h;
  white-space: nowrap;
    margin-block-start: 0;
   
    justify-self: flex-start;
    display: flex;
    margin-block-end: 0;

    color: ${theme.color.primary};
    vertical-align: middle;
   
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
 
 
  main {
    div{max-width:100%}
    background-color: white;
    grid-area: main;  
    border-radius: 4px;
    user-select: text;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    align-items: flex-start;
    align-content: flex-start;
  
    justify-content:stretch;
    flex-wrap:wrap;
    @media ${device.tablet} {
      font-size: 0.8rem;
      margin: 0;
      padding: 0;
      align-content: space-around;
      justify-content: stretch;
      align-items: stretch;
    }

    a {
 
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
    cursor: pointer;
  }

  button, input[type=reset], input[type=submit],  input[type=button]  {
    cursor: pointer;
    align-items: center;
    user-select: none;
    display: inline-flex;
    flex-wrap: nowrap;
    padding: 8px 12px;
    font-weight: bolder;
    font-size: 1.2rem;
    white-space: nowrap;

    :disabled {
    opacity: 1;
    background-color: ${theme.color.disabled};
    cursor: initial;
    border: none;
  }
  }

  button:disabled {
    color: white;
    background-color: black;
    
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
    border: none;
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
