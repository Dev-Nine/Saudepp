import React, { useRef, useCallback, useState } from 'react';

import { FiLock, FiUser, FiMail, FiCreditCard, FiKey } from 'react-icons/fi';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { useHistory } from 'react-router-dom';
import { cpf } from 'cpf-cnpj-validator';

import { useAuth } from '../../hooks/AuthProvider';
import Input from '../../components/Input';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

import getValidationErros from '../../utils/getValidationErros';
import { Container } from './styles';
import api from '../../services/api';
import setMap from '../../utils/registerMap';
import { registerTypes } from '../../utils/registerTypes';

export default function Reguster() {
   const history = useHistory();
   const registerMap = setMap();

   const formRef = useRef(null);

   const [selectedRegister, setSelectedRegister] = useState(
      registerMap.get('crp'),
   );

   const { signIn } = useAuth();

   const handleSubmit = useCallback(
      async (data) => {
         try {
            formRef.current.setErrors({});
            const schema = Yup.object().shape({
               email: Yup.string()
                  .required('Informe um email válido')
                  .email('Informe um email válido'),
               name: Yup.string()
                  .matches(
                     /^[a-zá-ùA-ZÁ-Ù ]{4,50}$/,
                     'Um nome não pode conter caracteres espeiciais',
                  )
                  .max(50, 'Um nome deve ter no máximo 50 letras')
                  .min(4, 'Um nome deve ter ao menos 4 letras.'),
               username: Yup.string()
                  .matches(
                     /^[a-z0-9_]{4,20}$/,
                     'Um nome de usuário não pode conter símbolos',
                  )
                  .max(
                     20,
                     'Um nome de usuário deve ter no máximo 20 letras ou números',
                  )
                  .min(
                     4,
                     'Um nome de usuário deve ter ao menos 4 letras ou números',
                  ),
               register: selectedRegister.test,
               password: Yup.string()
                  .matches(
                     /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9!@#$%&_-]{6,30})$/,
                     'São permitidos somente estes caracteres especiais: !, @, #, $, &, %, _ e -',
                  )
                  .matches(
                     /^(?=.*[0-9])(?=.*[a-zA-Z])(^.{6,30})$/,
                     'Uma senha deve conter ao menos uma letra e um número',
                  )
                  .max(20, 'Uma senha deve ter no máximo 20 caracteres')
                  .min(6, 'Uma senha deve ter ao menos 6 caracteres'),
               confirmPassword: Yup.string().oneOf(
                  [Yup.ref('password'), null],
                  'As senhas não coincidem',
               ),
            });

            await schema.validate(data, {
               abortEarly: false,
            });

            delete data.confirmPassword;

            await api.post('users', {
               ...data,
               identifierType: 'cpf',
               type: 0,
            });

            await signIn({ username: data.username, password: data.password });

            history.push('/');
         } catch (err) {
            if (err instanceof Yup.ValidationError) {
               const erros = getValidationErros(err);

               formRef.current.setErrors(erros);
               return;
            }

            console.log(err);
         }
      },
      [history, selectedRegister.test, signIn],
   );

   const handleSelectChange = (event) => {
      setSelectedRegister(registerMap.get(event.target.value));
   };

   return (
      <>
         <Header />
         <Container>
            <Form ref={formRef} onSubmit={handleSubmit}>
               <h1>Cadastrar Novo Usuário</h1>
               <Input icon={FiMail} name="email" placeholder="Email" />
               <Input icon={FiUser} name="name" placeholder="Nome Completo" />
               <Input
                  icon={FiKey}
                  name="username"
                  placeholder="Nome de Usuário"
               />
               <select onChange={handleSelectChange} name="registerType">
                  {registerTypes.map((obj) => (
                     <option value={obj.type}>{obj.name}</option>
                  ))}
               </select>
               <Input
                  icon={FiCreditCard}
                  name="register"
                  placeholder={selectedRegister.register}
                  mask={selectedRegister.mask}
               />
               {selectedRegister.state && (
                  <Input
                     icon={FiUser}
                     name="state"
                     placeholder={`Estado do ${selectedRegister.register}`}
                  />
               )}

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
                  type="password"
               />
               <button type="submit">Criar Conta</button>
               <div>
                  <a href="asd">Já tem uma conta? Entre.</a>
               </div>
            </Form>
         </Container>
         <Footer />
      </>
   );
}
