import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`

   :root {
      --main-color: #0094de;
      --main-ref-color: #4893dd;
      --main-light-color: #505050;
      --main-text-color: #303030;
      --main-contrast-color: #eaeaea;

      --title-fontsize: 36px;
      --text-fontsize: 22px;
   }

   * {
      /* overflow-x: hidden; //horizontal */
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      outline: 0;
   }
   html{
      height: 100%;
   }
   body {
      background: #FFF;
      height: 100%;
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
   
   #root{
      position: relative;
      display: flex;
      flex-direction: column;
      min-height: 100%;
   }

   .main {
      display: flex;
      flex-direction: column;
      align-items: center;
      align-self: center;
      max-width: 1300px;
      width: 100%;
      padding: 32px 40px;
   }

   @media only screen and (max-width: 1099px){
      .main {
         padding: 16px;
      }
   }
`;
