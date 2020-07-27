import styled, { css } from 'styled-components';
import Tooltip from '../Tooltip';

export const Container = styled.div`
   background: #FFF;
   position: relative;
   border-radius: 6px;
   width: 100%;
   border: 2px solid #FFF;
   color: #939393;
   display: flex;
   align-items: center;
   transition: border-color 0.4s;

   & + div {
      margin-top: 8px;
   }
   ${(props) =>
      props.isErrored &&
      css`
         border-color: #ff0000;
      `}
   ${(props) =>
      props.isFocused &&
      css`
         color: #77c6ff;
         border-color: #77c6ff;
      `}
   ${(props) =>
      props.isFilled &&
      css`
         color: #77c6ff;
      `}
   select {
      font-size: var(--text-smaller-fontsize);
      padding: 13px;
      color: #333;
      flex: 1;
      border: 0;
      & + input {
         margin-top: 8px;
      }
      &::placeholder {
         color: #939393;
      }
   }
   svg {
      margin-right: 16px;
      margin-left: 13px;
   }
`;

export const Error = styled(Tooltip)`
   height: 20px;
   margin-right: 13px;
   svg {
      margin-right: 0;
   }
   span {
      background: #ff0000;
      color: #fff;
      &::before {
         border-color: #ff0000 transparent;
      }
   }
`;
