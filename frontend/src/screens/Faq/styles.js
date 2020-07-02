import styled from 'styled-components';

export const Container = styled.div`
   width: 100%;

   h1 {
      font-size: 48px;
      color: #0094de;
   }

   h2 {
      font-size: 28px;
   }

   ul {
      margin-left: 40px;
      margin-top: 16px;
   }

   ul li {
      list-style: none;
      margin-bottom: 8px;
   }

   ul li:last-child {
      margin-bottom: 0;
   }

   a {
      text-decoration: underline;
      color: #0094de;
   }

   @media only screen and (max-width: 1099px) {
      h1 {
         font-size: 40px;
      }
      ul {
         margin-left: 20px;
      }
   }
`;
