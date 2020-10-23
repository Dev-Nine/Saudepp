import React, { useRef, useCallback, useState } from 'react';

import {
    FiLock,
    FiUser,
    FiMail,
    FiCreditCard,
    FiKey,
    FiMap,
    FiClipboard,
} from 'react-icons/fi';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { useHistory } from 'react-router-dom';

import axios from 'axios';
import { useEffect } from 'react';
import Input from '../../../../components/Input';
import Select from '../../../../components/Select';
import Header from '../../../../components/Header';
import Footer from '../../../../components/Footer';
import Dropzone from '../../../../components/Dropzone';

import getValidationErros from '../../../../utils/getValidationErros';
import { Container } from './styles';
import { FormStyle } from '../../../../styles/FormStyle';
import api from '../../../../services/api';
import setMap from '../../../../utils/registerMap';
import 'react-image-crop/dist/ReactCrop.css';
import AvatarChangeModal from '../../../../components/AvatarChangeModal';

export default function Create() {
    const history = useHistory();
    const registerMap = setMap();

    const formRef = useRef(null);

    const [imageModal, setImageModal] = useState(false);

    const [selectedRegister, setSelectedRegister] = useState({
        index: 'default',
    });
    const [selectedState, setSelectedState] = useState();
    const [states, setStates] = useState([]);

    const [file, setFile] = useState();
    const [fileUrl, setFileUrl] = useState('');

    const [finalImage, setFinalImage] = useState(null);

    const deleteImage = () => {
        setFinalImage(null);
    };

    useEffect(() => {
        if (file) setFileUrl(URL.createObjectURL(file));
    }, [file]);

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
                    registerType: Yup.string().notOneOf(
                        ['default'],
                        'Selecione um tipo de registro',
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

                if (finalImage) {
                    const formData = new FormData();
                    formData.append('image', finalImage);
                    const res = await api.post('/images', formData);
                    const { imageId, imageType } = res.data;
                    data = {
                        ...data,
                        imageId,
                        imageType,
                    };
                }

                await api.post('users', {
                    ...data,
                    type: 2,
                });

                history.push('/panel/users/');
            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    const erros = getValidationErros(err);

                    formRef.current.setErrors(erros);
                }
            }
        },
        [finalImage, history, selectedRegister.test],
    );

    const handleRegisterChange = (event) => {
        setSelectedRegister({
            index: event.target.value,
            ...registerMap.get(event.target.value),
        });
    };

    const handleStateChange = (event) => {
        setSelectedState(event.target.value);
    };

    useEffect(() => {
        axios
            .get(
                'https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome',
            )
            .then(({ data }) =>
                setStates(
                    data.map((obj) => ({
                        name: obj.nome,
                        initials: obj.sigla,
                    })),
                ),
            );
    }, []);

    return (
        <>
            <Header />
            <Container>
                <AvatarChangeModal
                    setFinalImage={setFinalImage}
                    isModalOpen={imageModal}
                    setIsModalOpen={setImageModal}
                    imageUrl={fileUrl}
                />
                <Form ref={formRef} onSubmit={handleSubmit}>
                    <FormStyle>
                        <h1>Cadastrar Novo Usuário</h1>
                        <Input icon={FiMail} name="email" placeholder="Email" />
                        <Input
                            icon={FiUser}
                            name="name"
                            placeholder="Nome Completo"
                        />
                        <Input
                            icon={FiKey}
                            name="username"
                            placeholder="Nome de Usuário"
                        />
                        <Select
                            value={selectedRegister.index}
                            onChange={handleRegisterChange}
                            name="registerType"
                            icon={FiClipboard}
                        >
                            {[...registerMap.keys()].map((value) => (
                                <option value={value} key={value}>
                                    {registerMap.get(value).name}
                                </option>
                            ))}
                        </Select>
                        {selectedRegister.index !== 'default' && (
                            <Input
                                icon={FiCreditCard}
                                name="register"
                                placeholder={selectedRegister.register}
                                mask={selectedRegister.mask}
                            />
                        )}
                        {selectedRegister.state && (
                            <Select
                                value={selectedState}
                                onChange={handleStateChange}
                                name="registerState"
                                icon={FiMap}
                            >
                                {states.map(({ name, initials }) => (
                                    <option value={initials} key={initials}>
                                        {`${initials} - ${name}`}
                                    </option>
                                ))}
                            </Select>
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

                        <div className="avatar-change">
                            {finalImage ? (
                                <div className="avatar">
                                    <h3>Foto de perfil</h3>
                                    <img
                                        src={URL.createObjectURL(finalImage)}
                                        alt="Avatar"
                                    />
                                    <button
                                        type="button"
                                        className="noborder"
                                        onClick={deleteImage}
                                    >
                                        Remover foto
                                    </button>
                                </div>
                            ) : null}
                            <Dropzone
                                setFile={setFile}
                                callback={() => setImageModal(true)}
                            />
                        </div>

                        <button type="submit">Criar Conta</button>
                    </FormStyle>

                    {/* <div>
                  <a href="asd">Já tem uma conta? Entre.</a>
               </div> */}
                </Form>
            </Container>
            <Footer />
        </>
    );
}
