import styled from 'styled-components';

export const Container = styled.div`
   background-color: var(--main-text-color);
   align-items: center;
   display: flex;
   flex-direction: column;
   color: var(--main-contrast-color);
   margin-top: auto;

   .content {
      max-width: 1300px;
      width: 100%;
      padding: 20px;
   }

   img {
      width: 30%;
   }

   p {
      font-weight: 400;
      margin-bottom: 16px;
   }

   hr {
      width: 40%;
   }

   @media only screen and (max-width: 1099px) {
      img {
         width: 70%;
      }
   }
`;

export const Header = styled.div`
   margin-bottom: 20px;
   hr {
      width: 40%;
   }

   @media only screen and (max-width: 1099px) {
      margin-bottom: 16px;

      h1 {
         font-size: 24px;
      }

      hr {
         display: none;
      }
   }
`;

export const Content = styled.div`
   display: flex;
   justify-content: space-between;
   margin-bottom: 20px;

   hr {
      width: 200px;
      margin-bottom: 20px;
   }

   @media only screen and (max-width: 1099px) {
      flex-direction: column;

      h2 {
         margin-top: 10px;
         font-size: 20px;
      }

      hr {
         width: 100%;
      }

      p {
         margin-bottom: 16px;
      }
   }
`;
