import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`

   * {
      overflow-x: hidden; //horizontal
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
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-left: 3em;
      margin-right: 3em;
   }

   @media only screen and (max-width: 1099px){
      .main {
         margin-left: 1em;
         margin-right: 1em;
      }
   }
`;