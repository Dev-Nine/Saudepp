import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
   * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      outline: 0
   }
   body {
      background: #FFF;
      -webkit-font-smoothing: antialiased;
   }
   body, input, button, textarea {
      font-family: 'Roboto', serif;
      font-size: 16px;
   }
   
   button {
      cursor: pointer;
      border: none;
   }

   .main {
      max-width: 1200px;
      margin-left: auto;
      margin-right: auto;
   }
`;