import React from 'react';
import Return from '../../components/return';

import { Container } from './styles';

export default function Register() {
   return (
      <>
         <Return />
         <Container>
            <form>
               <h1>Cadastre-se</h1>
               <input type="text" placeholder="Nome" />
               <input type="email" placeholder="E-mail" />
               <input type="password" placeholder="Nome" />
               <button type="submit">Criar Conta</button>
            </form>
         </Container>
      </>
   );
}
