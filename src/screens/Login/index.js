import React from 'react';
import './styles.css'

export default function Login(){

    return (
        <>
            <header className="return">
                <a href="#">Voltar ao inicio</a>
            </header>

            <div className="login-container">
                <div className="content">
                    <form>
                        <h1>Entre</h1>
                        <input type="text"  placeholder="E-mail"/>
                        <input type="password"  placeholder="Senha"/>
                        <a href="#">Esqueceu a senha ?</a>
                        <button type="submit">Entrar</button>
                        <p href="#">Não tem uma conta ? Crie uma</p>
                    </form>
                </div>
            </div>
        </>
    )
}