import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`

   :root {
      --main-color: #0094de;
      --main-ref-color: #4893dd;
      --main-light-color: #505050;
      --main-text-color: #303030;
      --main-contrast-color: #eaeaea;

      --main-basic-color: #77c6ff;
      --main-alert-color: #ff7777;
      --main-success-color: #7aff77;

      --text-big-fontsize: 36px;
      --text-medium-fontsize: 26px;
      --text-small-fontsize: 22px;
      --text-smaller-fontsize: 16px;
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
      font-size: var(--text-smaller-fontsize);
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

   .modal {
      display: flex;
      justify-content: center;
      right: auto;
      width: 60%;
      height: 80vh;
      left: 20%;
      top: 10%;
      padding: 8px;
      position: absolute;
      background: white;
      border: 2px solid var(--main-contrast-color);
      overflow-y: auto;
   }

   @media only screen and (max-width: 1099px){
      .main {
         padding: 16px;
      }

      .modal {
         width: 90%;
         top: 5%;
         height: 90vh;
         left: 5%;
      }
   }
`;
