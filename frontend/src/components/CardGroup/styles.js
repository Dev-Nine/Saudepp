import styled from 'styled-components'

export const Container = styled.div`
   margin-bottom: 30px;

   h1 {
      font-size: 26px;
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
      margin-top: 15px;

      display: grid;
      grid-template-columns: repeat(4, minmax(200px, 330px));
      gap: 2rem;

      justify-content: space-around;
      
      list-style: none;
   }

   li {
      background: #FFF;   
      border-radius: 8px;
   }

   @media (max-width: 1099px) {
      ul {
         grid-template-columns: repeat(1, 1fr);
      }
   }
`