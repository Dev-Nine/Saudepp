import * as Yup from 'yup';
import { cpf } from 'cpf-cnpj-validator';

export default function setMap() {
    const registerMap = new Map();

    registerMap.set('default', {
        name: 'Selecione o tipo de registro...',
        register: '',
        state: false,
        mask: '',
        test: null,
    });

    registerMap.set('crp', {
        name: 'Psicólogo',
        register: 'CRP',
        state: true,
        mask: '99/999999',
        test: Yup.string().matches(
            /^[1-9]{2}[/]{1}[1-9]{6}$/,
            'Um CRP deve possuir 8 digitos numéricos',
        ),
    });

    registerMap.set('crf', {
        name: 'Farmacêutico / Bioquímico',
        register: 'CRF',
        state: true,
        mask: '99999',
        test: Yup.string().matches(
            /^[1-9]{5}$/,
            'Um CRF deve possuir 5 digitos numéricos',
        ),
    });

    registerMap.set('crfa', {
        name: 'Fonoaudióloga',
        register: 'CRFa',
        state: true,
        mask: '99.999',
        test: Yup.string().matches(
            /^[1-9]{2}[.]{1}[1-9]{3}$/,
            'Um CRFa deve possuir 5 digitos numéricos',
        ),
    });

    registerMap.set('cro', {
        name: 'Dentista',
        register: 'CRO',
        state: true,
        mask: '99999',
        test: Yup.string().matches(
            /^[1-9]{5}$/,
            'Um CRO deve possuir 5 digitos numéricos',
        ),
    });

    registerMap.set('coren', {
        name: 'Enfermeiro',
        register: 'Coren',
        state: true,
        mask: '999999',
        test: Yup.string().matches(
            /^[1-9]{6}$/,
            'Um Coren deve possuir 6 digitos numéricos',
        ),
    });

    registerMap.set('crm', {
        name: 'Médico',
        register: 'CRM',
        state: true,
        mask: '999999',
        test: Yup.string().matches(
            /^[1-9]{6}$/,
            'Um CRM deve possuir 6 digitos numéricos',
        ),
    });

    registerMap.set('crn', {
        name: 'Nutricionista',
        register: 'CRN',
        state: true,
        mask: '99999',
        test: Yup.string().matches(
            /^[1-9]{5}$/,
            'O CRN deve possuir 5 digitos numéricos',
        ),
    });

    registerMap.set('crefito', {
        name: 'Fisioterapeuta',
        register: 'CREFITO',
        state: true,
        mask: '999999',
        test: Yup.string().matches(
            /^[1-9]{5}$/,
            'O CREFITO deve possuir 6 digitos numéricos',
        ),
    });

    registerMap.set('acm', {
        name: 'Agente Comunitário de Endemia',
        register: 'Número de matrícula (ACM)',
        state: false,
        mask: '999999',
        test: Yup.string().matches(
            /^[1-9]{6}$/,
            'O número da matrícula deve possuir 6 digitos numéricos',
        ),
    });

    registerMap.set('ace', {
        name: 'Agente de Combate à Endemia',
        register: 'Número de matrícula (ACE)',
        state: false,
        mask: '999999',
        test: Yup.string().matches(
            /^[1-9]{6}$/,
            'O número da matrícula deve possuir 6 digitos numéricos',
        ),
    });

    registerMap.set('cpf', {
        name: 'Outros',
        register: 'CPF',
        state: false,
        mask: '999.999.999-99',
        test: Yup.string().test(
            'CPF válido',
            'Informe um CPF válido',
            (value) => cpf.isValid(value),
        ),
    });

    return registerMap;
}
