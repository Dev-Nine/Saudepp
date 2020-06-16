import styled from 'styled-components'

import image from '../../image/coronavirus-4833754_1920-1230x450.jpg'

export const Container = styled.div`
   position: relative;
   width: 1210px;
   height: 241px;
   top: 55px;
   border-radius: 8px;
   margin-bottom: 98px;
   color: #FFF;
   background-image: url(${image});
   width: 100%;
   box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
   
   .corona_info {
      height: 100%;
      width: 100%;
      display: grid;
      grid-template-columns: 50% 50%;
      background: rgba(0, 0, 0, 0.45);
   }
   
   .corona_info div p {
      font-style: normal;
      font-weight: bold;
      font-size: 27px;
      line-height: 32px;
   }
   
   .corona_info div p strong {
      color: #D3C222;
   }
 `