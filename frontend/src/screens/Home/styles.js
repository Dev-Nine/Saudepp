import styled from 'styled-components';

export const Sobre = styled.div`
   display: flex;
   flex-direction: column;
   height: auto;
   box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
   border-radius: 8px;
   margin-bottom: 38px;
   padding: 24px 40px;
   max-width: 1300px;

   p {
      color: #161616;
      font-style: italic;
      font-family: 'Open Sans', sans-serif;
      font-size: 26px;
      font-weight: 500;
      text-align: justify;
      padding-right: 0.1em;
   }

   a {
      margin-top: 8px;
      font-style: normal;
      align-self: flex-end;
      font-size: 22px;
      text-align: justify;
      color: #679cd0;
   }

   @media only screen and (max-width: 1099px) {
      padding: 24px 20px;

      p,
      a {
         font-size: 20px;
      }

      p {
         overflow: hidden;
         text-overflow: ellipsis;
         display: -webkit-box;
         -webkit-line-clamp: 7; /* number of lines to show */
         -webkit-box-orient: vertical;
      }
   }
`;
