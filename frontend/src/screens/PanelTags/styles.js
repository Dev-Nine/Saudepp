import styled from 'styled-components';

export const Container = styled.div`
   width: 100%;

   h1 {
      font-weight: 400;
      font-size: 48px;
   }

   .description {
      font-size: 24px;
      margin-bottom: 40px;
   }

   a {
      text-decoration: none;
      color: inherit;
   }

   div table {
      width: 100%;
      border-style: solid;
      border-width: 1px;
   }

   @media only screen and (max-width: 1099px) {
      h1 {
         font-size: 32px;
      }
      .description {
         font-size: 20px;
      }
   }
`;
