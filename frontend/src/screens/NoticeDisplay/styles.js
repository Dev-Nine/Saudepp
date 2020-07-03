import styled from 'styled-components';

export const ContainerNoticia = styled.div`
   background-color: #f9f7f7;
   border-radius: 10px;
   box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
   width: 100%;

   .container {
      position: relative;
   }

   .container .gradient {
      width: 100%;
      height: 100%;
      background-image: linear-gradient(
         to top,
         rgba(249, 247, 247, 255),
         rgba(249, 247, 247, 0)
      );
      position: absolute;
      z-index: 99;
   }

   .container .banner {
      background-image: url('https://images.unsplash.com/photo-1593451693781-d32def89a464?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=746&q=80');
      background-size: cover;
      background-position: center;
      border-radius: 8px 8px 0 0;
      height: 160px;
   }

   .header {
      padding: 16px 40px;
   }

   img {
      width: 70%;
      padding: 16px 20px;
   }

   .header h1,
   p {
      margin-bottom: 16px;
   }

   .header p:last-child {
      margin-bottom: 0;
   }

   .header p:nth-child(2) {
      font-weight: 400;
      font-style: italic;
      color: #4a4a4a;
   }

   @media only screen and (max-width: 1099px) {
      .container .banner {
         height: 120px;
      }
      .header {
         padding: 16px 20px;
      }

      img {
         width: 100%;
         padding: 16px 20px;
      }
   }
`;

export const TextContainer = styled.div`
   padding: 16px 40px;

   @media only screen and (max-width: 1099px) {
      padding: 16px 20px;
   }
`;

export const ContainerComentario = styled.div`
   background-color: #f9f7f7;
   padding: 20px 40px;
   border-radius: 10px;
   box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

export const EscreverComentario = styled.div`
   background-color: #fff;
   padding: 20px 50px;
   border-radius: 10px;
   box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
   margin-top: 20px;
   display: flex;
   flex-direction: column;

   textarea {
      margin-top: 20px;
      box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
      border-radius: 8px;
      width: 100%;
      height: 160px;
      padding: 15px;

      border: none;
      resize: none;
      outline: none;
   }

   button {
      width: 120px;
      height: 35px;
      background: #77c6ff;
      font-weight: 500;
      color: white;
      align-self: flex-end;
      border-radius: 8px;
      margin-top: 10px;
   }
`;
