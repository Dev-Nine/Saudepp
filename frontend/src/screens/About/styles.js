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

   div {
      display: flex;
      flex-direction: column;
      height: auto;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      border-radius: 8px;
      margin-bottom: 38px;
      padding: 24px 40px;
      max-width: 1300px;
   }

   div p {
      color: black;
      font-size: 24px;
      text-align: justify;
      margin-bottom: 16px;
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
