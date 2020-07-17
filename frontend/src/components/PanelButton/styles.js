import styled from 'styled-components';

export const Container = styled.div`
   background-color: var(--main-ref-color);
   border-radius: 8px;
   padding: 32px 24px;
   box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
   width: 200px;

   flex-direction: column;
   align-items: center;

   svg {
      color: var(--main-contrast-color);
   }

   p {
      font-size: 20px;
      font-weight: bold;
      margin-top: 16px;
      color: var(--main-contrast-color);
   }

   @media only screen and (max-width: 1099px) {
      width: 100%;
   }
`;
