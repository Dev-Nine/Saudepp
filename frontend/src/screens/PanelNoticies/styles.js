import styled, { css } from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
   width: 100%;

   h1 {
      font-weight: 400;
      font-size: var(--text-big-fontsize);
   }

   a {
      text-decoration: none;
      color: inherit;
   }
`;

export const Table = styled.div`
   width: 100%;
`;

export const TableLine = styled.div`
   border-width: 0 0 1px 0;
   padding: 10px 0;
   border-color: var(--main-light-color);
   font-size: var(--text-small-fontsize);
   border-style: solid;

   display: grid;
   grid-template-columns: 3fr 1fr 1fr 80px;
   align-items: center;

   ${(props) => {
      if (props.isHeader) {
         return css`
            border-width: 1px 0 1px 0;
            font-weight: bold;
         `;
      }
   }}

   a + a {
      margin-left: 8px;
   }

   div:last-child {
      width: 80px;
      display: flex;
      justify-content: center;
      margin-left: auto;
   }

   @media only screen and (max-width: 1099px) {
      grid-template-columns: 1fr;

      div:last-child {
         width: auto;
         margin: 0;
      }
      a {
         width: 100%;
      }
   }
`;

export const Button = styled.button`
   width: 36px;
   height: 36px;

   ${(props) => {
      if (props.isDelete) {
         return css`
            background: var(--main-alert-color);
         `;
      }
      if (props.isCreate)
         return css`
            background: var(--main-success-color);
         `;
      return css`
         background: #77c6ff;
      `;
   }}
   box-shadow: 0px 2px 1px #6fa9d3;
   border-radius: 8px;

   @media only screen and (max-width: 1099px) {
      width: 100%;
   }
`;
