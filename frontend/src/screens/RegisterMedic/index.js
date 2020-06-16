import React from 'react';
import Return from '../../components/return';

import { Container } from '../Register/styles';

export default function RegisterMedic() {
  return (
    <>
        <Return/>
        <Container>
            <div>
                <form>
                    <h1>Cadastrar Profissional</h1>
                    <input className="input-form" type="text" placeholder="Nome"/>
                    <input className="input-form" type="email" placeholder="E-mail"/>
                    <select name="" id="" className="select-form">
                        <option className="option-form"value="">Médico</option>
                    </select>
                    <div className="group-crf">
                      <section>
                        <input className="input-form"type="text" placeholder="CRM"/>
                      </section>
                      <select name="" id="" className="select-form">
                        <option value="">SP</option>
                        <option value="">AM</option>
                        <option value="">MG</option>
                        <option value="">MS</option>
                        <option value="">MT</option>
                        <option value="">PR</option>
                        <option value="">MR</option>
                        <option value="">PB</option>
                        <option value="">PA</option>
                      </select>
                    </div>
                    <button className="button-form"type="submit">Criar Conta</button>
                </form>
            </div>
        </ Container>
    </>    
  );
}
