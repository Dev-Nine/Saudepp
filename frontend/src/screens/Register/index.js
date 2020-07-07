import React, { useRef, useCallback } from 'react';

import { FiLock, FiUser, FiMail, FiCreditCard, FiKey } from 'react-icons/fi';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { useHistory } from 'react-router-dom';

import { useAuth } from '../../hooks/AuthProvider';
import Input from '../../components/Input';
import getValidationErros from '../../utils/getValidationErros';
import { Container } from './styles';

export default function Reguster() {
   const history = useHistory();

   const formRef = useRef(null);

   const { signIn } = useAuth();

   const handleSubmit = useCallback(async (data) => {
      try {
      } catch (err) {
         console.log(err);
      }
   }, []);

   return (
      <Container>
         <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Cadastrar Novo Usuário</h1>

            <Input icon={FiMail} name="email" placeholder="Email" />

            <Input icon={FiUser} name="name" placeholder="Nome Completo" />
            <Input icon={FiKey} name="username" placeholder="Nome de Usuário" />

            <Input
               icon={FiCreditCard}
               name="identifier"
               placeholder="CPF"
               mask="999.999.999-99"
            />

            <Input
               icon={FiLock}
               name="password"
               placeholder="Sua Senha"
               type="password"
            />
            <Input
               icon={FiLock}
               name="confirmPassword"
               placeholder="Confirme sua Senha"
               type="confirmPassword"
            />

            <button type="submit">Criar Conta</button>

            <div>
               <a href="asd">Já tem uma conta? Entre.</a>
            </div>
         </Form>
      </Container>
   );
}
