import styled from 'styled-components'

import image from '../../image/coronavirus-4833754_1920-1230x450.jpg'

export const Container = styled.div`
   position: relative;
   height: auto;
   width: 100%;
   padding: 40px 0;
   margin-bottom: 50px;
   border-radius: 8px;
   color: #FFF;

   background-image: url(${image});
   background-size: cover;
   background-position: center;
   box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
   background-color: rgba(0, 0, 0, 0.45);
   background-blend-mode: darken;
   
   display: flex;
   align-items: center;
   justify-content: space-between;

   h1 {
      font-size: 60px;
   }
   
   div p {
      font-weight: bold;
      font-size: 27px;
   }
   
   div p strong {
      color: #D3C222;
   }

   /* desktop */
   @media only screen and (min-width: 1100px){
      div {
         padding: 0 40px;
      }

      .corona-data {
         display: grid;
         grid-template-columns: auto auto;
      }

      .corona-data p {
         padding: 0 10px;
      }
   }

   @media only screen and (max-width: 1099px){
      flex-direction: column;
      align-items: flex-start;
      padding: 20px 20px;
      margin: 20px 0;

      .corona-data {
         margin-top: 30px;
      }

      h1 {
         font-size: 32px;
      }

      .corona-data p, .corona-text p {
         font-size: 24px;
      }

      .corona-data p:nth-child(2) {
         margin-bottom: 20px;
      }
   }
   
 `