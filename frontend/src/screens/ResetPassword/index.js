import React, { useRef, useCallback } from 'react';

import { FiLock } from 'react-icons/fi';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { useHistory, useLocation } from 'react-router-dom';

import Input from '../../components/Input';
import getValidationErros from '../../utils/getValidationErros';
import { Container } from './styles';
import api from '../../services/api';

export default function ResetPassword() {
   const history = useHistory();
   const location = useLocation();

   const formRef = useRef(null);

   const handleSubmit = useCallback(
      async (data) => {
         try {
            formRef.current.setErrors({});

            const schema = Yup.object().shape({
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

            const token = location.search.replace('?token=', '');

            if (!token) {
               throw new Error(
                  'Token não localizado, verifique o link enviado pelo e-mail',
               );
            }

            await api.put(`/recover/${token}`, data);

            alert('Senha alterada');

            history.push('/login');
         } catch (err) {
            if (err instanceof Yup.ValidationError) {
               const erros = getValidationErros(err);

               formRef.current.setErrors(erros);
               return;
            }

            alert(err.message);
            history.push('/login');
         }
      },
      [history, location.search],
   );

   return (
      <Container>
         <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Redefinir Senha</h1>
            <Input
               icon={FiLock}
               name="password"
               placeholder="Sua nova senha"
               type="password"
            />
            <Input
               icon={FiLock}
               name="confirmPassword"
               placeholder="Confirme sua nova Senha"
               type="password"
            />
            <button type="submit">Redefinir Senha</button>
         </Form>
      </Container>
   );
}
