import styled from 'styled-components';

export const Container = styled.div`
   width: 100%;

   h1 {
      font-weight: 500;
      color: var(--main-text-color);
      font-size: var(--text-big-fontsize);
   }

   .description {
      font-size: var(--text-small-fontsize);
      color: var(--main-text-color);
      margin-bottom: 40px;
   }

   a {
      text-decoration: none;
      color: inherit;
   }

   div {
      display: flex;
      justify-content: space-around;
   }

   @media only screen and (max-width: 1099px) {
      h1 {
         font-size: 32px;
      }
      .description {
         font-size: 20px;
      }
      div {
         flex-direction: column;
         margin-bottom: 20px;
      }
   }
`;
