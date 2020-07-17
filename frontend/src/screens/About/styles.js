import styled from 'styled-components';

export const Container = styled.div`
   width: 100%;

   h1 {
      font-size: 36px;
      color: var(--main-color);
   }

   div {
      display: flex;
      flex-direction: column;
      height: auto;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      border-radius: 8px;
      padding: 24px;
      max-width: 1300px;
   }

   div p {
      color: var(--main-text-color);
      font-size: 22px;
      line-height: 1.5;
   }

   @media only screen and (max-width: 1099px) {
      h1 {
         font-size: 40px;
      }
      div {
         padding: 24px 20px;
      }
      div p {
         font-size: 20px;
      }
   }
`;
