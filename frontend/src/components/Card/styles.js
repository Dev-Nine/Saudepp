import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
   display: flex;
   flex-direction: column;
   height: 100%;

   background: #ffffff;

   border: 2px solid #a2a2a2;
   box-sizing: border-box;
   border-radius: 10px;
   box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

   transition: border-color 0.4s;
   transition: background-color 0.4s;

   &:hover {
      border-color: ${shade(0.3, '#a2a2a2')};
      background: linear-gradient(
         45deg,
         rgba(255, 255, 255, 1) 0%,
         rgba(225, 225, 225, 1) 100%
      );
   }

   img {
      max-width: 100%;
      height: 180px;
      max-height: 100%;
      object-fit: cover;
      border-radius: 10px 10px 0 0;
   }

   div {
      display: flex;
      overflow-wrap: break-word;
      flex: 1;
      flex-direction: column;
      margin: 5px 15px 5px 15px;
   }

   div strong {
      margin-top: 10px;
      font-weight: bold;
      font-size: 20px;
   }

   div p {
      margin-top: 7px;
      font-size: 16px;

      margin-bottom: 15px;

      color: #4a4a4a;
   }

   div span {
      font-weight: 500;
      font-size: 16px;

      color: #787878;
   }

   @media (min-width: 1100px) {
      div span:nth-child(3) {
         margin-top: auto;
      }
   }

   @media (max-width: 1099px) {
      flex-direction: row;

      img {
         max-width: 30%;
         height: auto;
      }

      div strong {
         font-size: 18px;
      }

      div p,
      div span {
         font-size: 14px;
      }
   }
`;
