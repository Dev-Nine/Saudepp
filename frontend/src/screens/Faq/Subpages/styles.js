import styled from 'styled-components';

export const Container = styled.div`
   width: 100%;
   padding: 0 40px;

   h2 {
      font-size: 32px;
   }

   ul li {
      list-style: none;
      font-size: 32px;
      font-weight: 500;
      margin-bottom: 28px;
   }

   ul li:last-child {
      margin-bottom: 0;
   }

   li p {
      font-size: 20px;
      font-weight: 300;
      text-align: justify;
      margin-bottom: 16px;
   }

   li p:last-child {
      margin-bottom: 0;
   }

   a {
      text-decoration: none;
      color: blue;
   }

   @media only screen and (max-width: 1099px) {
   }
`;
