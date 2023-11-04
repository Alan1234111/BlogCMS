import {createGlobalStyle} from "styled-components";

const GlobalStyles = createGlobalStyle`
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    body {
        max-width: 1200px;
        margin: 0 auto;
        font-family: sans-serif;
    }

`;

export default GlobalStyles;
