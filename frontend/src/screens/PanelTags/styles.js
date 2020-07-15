import styled from 'styled-components';

export const Container = styled.div`
   width: 100%;

   h1 {
      font-weight: 400;
      font-size: 48px;
   }

   .description {
      font-size: 24px;
      margin-bottom: 40px;
   }

   a {
      text-decoration: none;
      color: inherit;
   }

   @media only screen and (max-width: 1099px) {
      h1 {
         font-size: 32px;
      }
      .description {
         font-size: 20px;
      }
   }
`;

export const Table = styled.div`
   width: 100%;
`;

export const TableHeader = styled.div`
   width: 100%;
   border-width: 0 0 1px 0;
   border-color: #989898;
   border-style: solid;

   display: flex;
   align-items: center;

   font-weight: bold;
   font-size: 24px;
   line-height: 28px;
   height: 50px;

   div {
      width: 80%;
   }

   div + div {
      width: 20%;
      text-align: center;
      font-size: 50px;
   }
`;

export const TableLine = styled.div`
   width: 100%;
   border-width: 0 0 1px 0;
   border-color: #989898;
   border-style: solid;
   display: flex;
   height: 50px;

   div {
      width: 80%;
   }

   div + div {
      width: 20%;
   }
`;
