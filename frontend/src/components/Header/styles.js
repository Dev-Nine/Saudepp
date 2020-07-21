import styled from 'styled-components';

export const Container = styled.div`
   /* mobile e desktop */
   background: #ffffff;
   box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

   div {
      max-width: 1300px;
      margin: 0 auto;
   }

   nav a {
      font-size: var(--text-smaller-fontsize);
   }

   .logout {
      color: var(--main-alert-color);
   }

   .menu {
      display: flex;
      transition: padding 0.5s;
   }

   .menu-logo {
      padding: 0 10px;
      text-decoration: none;
   }

   .menu-logo p:first-child {
      font-size: var(--text-medium-fontsize);
      font-weight: bold;
      text-decoration: none;
      color: #0094de;
   }

   .menu-logo p {
      color: #161616;
   }

   .icon {
      cursor: pointer;
   }

   /* desktop */
   @media only screen and (min-width: 1100px) {
      .menu {
         padding: 10px 10px;
         max-width: 100%;
         flex-wrap: wrap;
      }

      nav {
         display: flex;
         flex-grow: 1;
         align-items: center;
         justify-content: flex-end;
      }

      nav a {
         display: flex;
         justify-content: center;
         align-items: center;
         margin-right: 8px;
         text-align: center;
         width: 110px;
         height: 100%;
         font-weight: bold;
         color: #0094de;
         text-decoration: none;
         transition: filter 0.2s;
      }

      nav a:hover {
         filter: brightness(80%);
      }

      img {
         border-radius: 100%;
         width: 50px;
         height: 50px;
         margin-right: 10px;
      }

      .icon {
         display: none;
      }
   }
   /* mobile */
   @media only screen and (max-width: 1099px) {
      div {
         margin: 0 0;
      }

      .menu {
         padding: 10px 40px;
      }

      nav {
         position: absolute;
         display: none;
         flex-direction: column;
         align-items: flex-end;
         background-color: #fff;
         right: 30px;
         top: 68px;
         z-index: 20;
         border-radius: 0 0 8px 8px;
      }

      nav a {
         font-weight: bold;
         color: #0094de;
         text-decoration: none;
         padding: 10px 30px;
      }

      img {
         display: none;
      }

      .icon {
         align-self: center;
         margin-left: auto;
      }

      .show-dropdown {
         display: flex;
      }
   }
`;
