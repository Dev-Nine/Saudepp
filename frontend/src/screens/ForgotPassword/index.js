import React, { useRef, useCallback } from 'react';

import { FiLock, FiUser } from 'react-icons/fi';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { useHistory, Link } from 'react-router-dom';

import Input from '../../components/Input';
import getValidationErros from '../../utils/getValidationErros';
import { Container } from './styles';

export default function ForgotPassword() {
   const history = useHistory();

   const formRef = useRef(null);

   const handleSubmit = useCallback(
      async (data) => {
         try {
            formRef.current.setErrors({});

            const schema = Yup.object().shape({
               user: Yup.string()
                  .required('Insira um e-mail')
                  .email('Insira um e-mail válido'),
               password: Yup.string().required('Senha obrigatória'),
            });

            await schema.validate(data, {
               abortEarly: false,
            });

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
      [history],
   );

   return (
      <Container>
         <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Entre</h1>
            <Input icon={FiUser} name="user" placeholder="Usuário ou E-mail" />
            <button type="submit">Entrar</button>

            <div>
               <Link to="/">Voltar ao inicio</Link>
            </div>
         </Form>
      </Container>
   );
}
