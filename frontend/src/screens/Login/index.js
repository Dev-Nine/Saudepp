import React, {useRef, useCallback} from 'react';

import { FiMail, FiLock } from 'react-icons/fi'
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import Return from '../../components/return'
import Input from '../../components/Input'
import getValidationErros from '../../utils/getValidationErros';
import {Container} from './styles.js'

export default function Login(){
    const formRef = useRef(null);
    
    const handleSubmit = useCallback(async (data) => {
        try {
            formRef.current.setErrors({});
            
            const schema = Yup.object().shape({
                email: Yup.string()
                .required('Insira um e-mail')
                .email('Insira um e-mail válido'),
                password: Yup.string().required('Senha obrigatória'),
            });
            
            await schema.validate(data, {
                abortEarly: false,
            });
        } catch (err) {
            const errors = getValidationErros(err);
            formRef.current.setErrors(errors);
        }
    }, []);
    
    return (
        <Container>
            <Form ref={formRef} onSubmit={handleSubmit}>
                <h1>Entre</h1>
                    <Input
                    icon={FiMail}
                    name="email"
                    placeholder="E-Mail"
                    />
                    <Input
                    icon={FiLock}
                    name="password"
                    placeholder="Senha"
                    type="password"
                    />
                <a href="asd">Esqueceu a senha ?</a>

                <button type="submit">Entrar</button>

                <div>
                    <a href="asd">Não tem uma conta ? Crie uma</a>
                    <a href="asda">Voltar ao inicio</a>
                </div>
            </Form>

        </Container>
        )
    }