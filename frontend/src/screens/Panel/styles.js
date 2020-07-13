import styled from 'styled-components';

export const Container = styled.div`
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

   div {
      display: flex;
      justify-content: space-around;
   }

   @media only screen and (max-width: 1099px) {
      h1 {
         font-size: 32px;
      }
      .description {
         font-size: 20px;
      }
      div {
         flex-direction: column;
         margin-bottom: 20px;
      }
   }
`;
