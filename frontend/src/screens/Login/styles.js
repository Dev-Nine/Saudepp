import styled from 'styled-components';
import {shade} from 'polished'

export const Container = styled.div`

   display: flex;
   height: 100vh;
   justify-content: center;
   align-items:center;
   padding: 10px;

   form {     
      border-radius: 20px;
      background: #F4F4F4;
      width: 400px;
      max-width: 650px;
      padding: 25px;
      text-align: center;

      button {
         flex: 1;
         width: 100%;
         padding: 16px;
         border-radius: 5px;
         background: #77C6FF;
         font-weight: bold;
         border: 0;
         color: #FFF;
         transition: background-color 0.4s;

         &:hover {
            background-color: ${shade(0.1, '#77C6FF')}
         }
      }

      h1 {
         margin-bottom: 15px;
      }

      a {
         text-decoration: none;
         text-align: left;
         display: block;
         color: #77c6ff;
         font-weight: 500;
         margin-top: 10px;
         transition: color 0.4s
      }


      > a {
         margin-top: 10px;
         margin-bottom: 20px; 
      }

      a:hover {
         color: ${shade(0.1, '#77C6FF')}
      }

   }
`