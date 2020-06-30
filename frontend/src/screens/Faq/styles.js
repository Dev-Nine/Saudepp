import styled from 'styled-components'

export const Container = styled.div`
   width: 100%;
   padding: 0 40px;

   h1 {
      font-size: 48px;
      color: #0094DE;
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

   a {
      text-decoration: none;
      color: blue;
   }

   @media only screen and (max-width: 1099px){

   }
`
