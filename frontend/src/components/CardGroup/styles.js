import styled from 'styled-components'

export const Container = styled.div`
   h1 {
      font-size: 26px;
      line-height: 30px;

      color: #000000;
   }

   hr {
      width: 210px;
      height: 5px;

      background: #333333;

      border: 0;
      border-radius: 0px 10px 10px 0px;
   }

   ul {
      margin-top:15px;
      margin-bottom: 30px;

      display: grid;
      grid-template-columns: repeat(4, 1fr);

      justify-content: space-between;
      
      list-style: none;
   }

   li {
      background: #FFF;

      position: relative;
   
      border-radius: 8px;
   }

   /* @media (max-width: 1250px) {
      div {
         margin-left: 15px
      }

      ul {
         grid-template-columns: repeat(2, 1fr);
         justify-content: space-between;

      }
   } */
`