import styled from 'styled-components'

export const Container = styled.div`
   height: auto;
   display: flex;
   flex-direction: column; 
    

   background: #FFFFFF;
   
   border: 1.5px solid #A2A2A2;
   box-sizing: border-box;
   border-radius: 10px;
   box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

   a {
      text-decoration: none;
      color: black;
   }

   img {
      max-width: 100%;
      max-height: 100%;
      object-fit: cover;
      border-radius: 10px 10px 0 0;
   }

   div {
      display: flex;
      flex-direction: column;
      margin: 5px 15px 5px 15px;
   }

   div strong {
      margin-top: 10px;
      font-weight: bold;
      font-size: 24px;

   }

   div p {
      margin-top: 7px;
      font-size: 16px;

      margin-bottom: 15px;

      color: #4A4A4A;
   }

   div span {
      font-weight: 500;
      font-size: 16px;

      color: #787878;
   }

   @media (max-width: 1099px) {
      flex-direction: row;
      
      img {
         max-width: 40%;
         max-height: 40%;
      }

      div strong {
         font-size: 18px;
      }

      div p, div span {
         font-size: 14px;
      }
   }
`
