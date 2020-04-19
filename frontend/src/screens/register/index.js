import React from 'react';
import Return from '../../components/return'

import './styles.css'

export default function Register() {
  return (
    <>
        <Return/>
        <div className="register-container">
            <div className="register-form">
                <form>
                    <h1>Cadastra-se</h1>
                    <input className="input-form"type="text" placeholder="Nome"/>
                    <input className="input-form"type="email" placeholder="E-mail"/>
                    <input className="input-form"type="password" placeholder="Nome"/>
                    <button className="button-form"type="submit">Criar Conta</button>
                </form>
            </div>
        </div>
    </>
  );
}
