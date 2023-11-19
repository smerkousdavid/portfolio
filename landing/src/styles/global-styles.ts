import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  #root {
    min-height: 100vh;
    min-width: 100vw;
    overflow: hidden;
    /* background-color: #001219; */
    font-family: 'Open Sans', sans-serif;
    color: #e9d8a6;
  }

  p, label {
    color: #e9d8a6;
    font-family: 'Open Sans', sans-serif;
  }

  a {
    color: #e9d8a6;
    cursor: pointer;
    text-decoration: none;
    transition: opacity .2s ease-out;
    opacity: 1;
  }

  a:hover {
    opacity: 0.65;
  }

  .element {
    height:1000px;
    background-color: #ededed;
    font-size: 45px;
    border-top:1px solid #000;
    padding-top:55px;
    padding-left:10px;
  }

  .link-button {
    padding: 6px 13px;
    color: #e9d8a6;
    font-size: 1.1em;
    font-weight: 500;
    background-color: transparent;
    border: 2px solid #e9d8a6;
    border-radius: 50px;
    transition: color .2s ease-in-out, background-color .2s ease-in-out;
    cursor: pointer;
  }

  .link-button:hover {
    color: #001219;
    background-color: #e9d8a6;
    opacity: 1.0;
  }

  .link-button:focus {
    outline: 0;
  }

  /* p,
  label {
    font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  } */

  input, select {
    font-family: inherit;
    font-size: inherit;
  }
`;
