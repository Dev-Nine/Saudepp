import styled from 'styled-components';

export const Container = styled.div`
   width: 100%;
   height: 100vh;
   display: flex;
   justify-content: center;
   align-items: center;

   form h1 {
      text-align: center;
      margin-bottom: 20px;
   }

   form a {
      font-size: 17px;
      text-decoration: none;
      color: #939393;
      margin-top: 10px;
   }

   .group-crf {
      width: 100%;
      height: 60px;
      display: flex;
      justify-content: space-between;
      align-items: center;
   }

   .group-crf section .input-form {
      width: 230px;
      margin-top: 25px;
   }

   .group-crf .select-form {
      width: 122px;
      margin-top: 25px;
   }
`;
