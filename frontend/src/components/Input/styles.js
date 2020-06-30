import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

export const Container = styled.div`
   background: #FFF;
   border-radius: 6px;
   padding: 13px;
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
         color: #77C6FF;
         border-color: #77C6FF;
      `}
   ${(props) =>
      props.isFilled &&
      css`
         color: #77C6FF;
      `}
   input {
      color: #333;
      flex: 1;
      border: 0;
      background: transparent;
      & + input {
         margin-top: 8px;
      }
      &::placeholder {
         color: #939393;
      }
   }
   svg {
      margin-right: 16px;
   }
`;

export const Error = styled(Tooltip)`
   height: 20px;
   margin-left: 16px;
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