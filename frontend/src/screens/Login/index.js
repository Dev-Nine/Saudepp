import React, { useRef, useCallback, useState } from 'react';

import { FiLock, FiUser } from 'react-icons/fi';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { useHistory, Link } from 'react-router-dom';

import { useAuth } from '../../hooks/AuthProvider';
import Input from '../../components/Input';
import getValidationErros from '../../utils/getValidationErros';
import { Container } from './styles';

export default function SignIn() {
    const [loginErr, setLoginErr] = useState('');

    const history = useHistory();

    const formRef = useRef(null);

    const { signIn } = useAuth();

    const handleSubmit = useCallback(
        async (data) => {
            try {
                formRef.current.setErrors({});

                let schema;
                let signInData;

                if (/(.+)@(.+){2,}\.(.+){2,}/.test(data.user)) {
                    schema = Yup.object().shape({
                        user: Yup.string()
                            .required('Insira um e-mail')
                            .email('Insira um e-mail válido'),
                        password: Yup.string().required('Senha obrigatória'),
                    });

                    signInData = { email: data.user, password: data.password };
                } else {
                    schema = Yup.object().shape({
                        user: Yup.string().required('Insira um Usuário válido'),
                        password: Yup.string().required('Senha obrigatória'),
                    });

                    signInData = {
                        username: data.user,
                        password: data.password,
                    };
                }

                await schema.validate(data, {
                    abortEarly: false,
                });

                await signIn(signInData);

                history.push('/');
            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    const erros = getValidationErros(err);

                    formRef.current.setErrors(erros);
                } else if (err.response.status === 400)
                    setLoginErr('Credenciais incorretos');
                else setLoginErr('Ocorreu um erro');
            }
        },
        [history, setLoginErr, signIn],
    );

    return (
        <Container>
            <Form ref={formRef} onSubmit={handleSubmit}>
                <h1>Entre</h1>
                <h3>{loginErr}</h3>
                <Input
                    icon={FiUser}
                    name="user"
                    placeholder="Usuário ou E-mail"
                />
                <Input
                    icon={FiLock}
                    name="password"
                    placeholder="Senha"
                    type="password"
                />
                <Link to="/forgot-password">Esqueceu a senha?</Link>

                <button type="submit">Entrar</button>

                <div>
                    {/* <a href="asd">Não tem uma conta ? Crie uma</a> */}
                    <Link to="/">Voltar ao inicio</Link>
                </div>
            </Form>
        </Container>
    );
}
