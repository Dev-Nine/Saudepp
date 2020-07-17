import styled from 'styled-components';

export const Container = styled.div`
   width: 100%;

   h1,
   h2,
   p {
      color: #303030;
   }

   h2 {
      font-size: 32px;
   }

   ul li {
      list-style: none;
   }

   ul li:last-child {
      margin-bottom: 0;
   }

   ul.summary li {
      font-size: 24px;
      margin-bottom: 8px;
   }

   ul.faq li {
      font-size: 32px;
      font-weight: 500;
      margin-bottom: 16px;
   }

   ul.faq li p {
      font-size: 20px;
      font-weight: 300;
      margin-bottom: 16px;
   }

   ul.faq li p:last-child {
      margin-bottom: 0;
   }

   a {
      text-decoration: none;
      color: #0094de;
   }

   @media only screen and (max-width: 1099px) {
   }
`;
