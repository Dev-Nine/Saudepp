import React, { useRef, useCallback, useState } from 'react';

import {
    FiLock,
    FiUser,
    FiMail,
    FiCreditCard,
    FiKey,
    FiMap,
    FiClipboard,
    FiX,
} from 'react-icons/fi';
import * as Yup from 'yup';
import { Form } from '@unform/web';
// import { useHistory } from 'react-router-dom';
// import { Redirect } from 'react-router-dom';

import axios from 'axios';
import { useEffect } from 'react';
import Modal from 'react-modal';

import { Redirect } from 'react-router-dom';
import Input from '../../../../components/Input';
import Select from '../../../../components/Select';
import Header from '../../../../components/Header';
import Footer from '../../../../components/Footer';
import Dropzone from '../../../../components/Dropzone';

import getValidationErros from '../../../../utils/getValidationErros';
import { Container } from './styles';
import api from '../../../../services/api';
import registerMap from '../../../../utils/registerMap';
import 'react-image-crop/dist/ReactCrop.css';
import { FormStyle } from '../../../../styles/FormStyle';
import AvatarChangeModal from '../../../../components/AvatarChangeModal';
import { useAuth } from '../../../../hooks/AuthProvider';
// import { useAuth } from '../../../../hooks/AuthProvider';

export default function Edit(props) {
    // const history = useHistory();
    const { user: authUser } = useAuth();

    // modal
    const [passwordModal, setPasswordModal] = useState(false);
    const [imageModal, setImageModal] = useState(false);

    const { computedMatch } = props;
    const { params } = computedMatch;
    const { userId } = params;

    const [isLoading, setIsLoading] = useState(true);

    const [user, setUser] = useState({});

    const [selectedRegister, setSelectedRegister] = useState({});
    const [selectedState, setSelectedState] = useState();
    const [states, setStates] = useState([]);
    useEffect(() => {
        api.get(`/users/${userId}`).then((response) => {
            const registerDetails = registerMap.get(response.data.registerType);
            setUser(response.data);
            setIsLoading(false);
            setSelectedRegister({
                index: response.data.registerType,
                ...registerDetails,
            });
            if (response.data.registerState)
                setSelectedState(response.data.registerState);
        });
    }, [authUser.id, selectedState, setIsLoading, userId]);

    const formRef = useRef(null);
    const passwordFormRef = useRef(null);

    const [file, setFile] = useState();
    const [fileUrl, setFileUrl] = useState('');

    const [finalImage, setFinalImage] = useState(null);
    const [removeAvatar, setRemoveAvatar] = useState(false);

    const deleteImage = () => {
        setFinalImage(null);
        setRemoveAvatar(true);
    };

    useEffect(() => {
        if (file) setFileUrl(URL.createObjectURL(file));
    }, [file]);

    const handlePasswordChange = useCallback(
        async (data) => {
            try {
                passwordFormRef.current.setErrors({});
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

                delete data.confirmPassword;

                // console.log(user);
                // console.log(data);

                try {
                    await api.put(`/users/${user.id}`, { ...data });
                } catch (err) {
                    // console.log({ err });
                }

                // history.push('/panel/users/');
            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    const erros = getValidationErros(err);
                    passwordFormRef.current.setErrors(erros);
                }
            }
        },
        [user],
    );

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
                });

                await schema.validate(data, {
                    abortEarly: false,
                });

                delete data.confirmPassword;

                // console.log(data);

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
                } else if (removeAvatar) {
                    data = {
                        ...data,
                        imageId: null,
                    };
                }
                try {
                    await api.put(`users/${userId}`, {
                        ...data,
                    });
                } catch (err) {
                    console.log(err.response.data);
                    console.log(data);
                }

                // history.push('/panel/users/');
            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    const erros = getValidationErros(err);

                    formRef.current.setErrors(erros);
                }
            }
        },
        [finalImage, removeAvatar, selectedRegister.test, userId],
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

    return Number(userId) === authUser.id || authUser.type === 0 ? (
        <>
            <Header />
            <Container>
                <Modal
                    isOpen={passwordModal}
                    onRequestClose={() => setPasswordModal(false)}
                    className="modal"
                >
                    <button
                        type="button"
                        onClick={() => setPasswordModal(false)}
                        className="close"
                    >
                        <FiX size="32px" />
                    </button>

                    <Form ref={passwordFormRef} onSubmit={handlePasswordChange}>
                        <FormStyle>
                            <h1>Alterar senha</h1>
                            <Input
                                icon={FiLock}
                                name="password"
                                placeholder="Senha"
                                type="password"
                            />
                            <Input
                                icon={FiLock}
                                name="confirmPassword"
                                placeholder="Confirme a Senha"
                                type="password"
                            />
                            <div>
                                <button type="submit">Alterar senha</button>
                                <button type="button" className="alert">
                                    Cancelar
                                </button>
                            </div>
                        </FormStyle>
                    </Form>
                </Modal>
                <AvatarChangeModal
                    setFinalImage={(image) => {
                        setFinalImage(image);
                        setRemoveAvatar(false);
                    }}
                    isModalOpen={imageModal}
                    setIsModalOpen={setImageModal}
                    imageUrl={fileUrl}
                />
                <Form ref={formRef} onSubmit={handleSubmit}>
                    <FormStyle>
                        <h1>Alterar usuário</h1>
                        {isLoading ? (
                            <p>Carregando usuário...</p>
                        ) : (
                            <>
                                <Input
                                    icon={FiMail}
                                    name="email"
                                    placeholder="Email"
                                    defaultValue={`${user.email}`}
                                />
                                <Input
                                    icon={FiUser}
                                    name="name"
                                    placeholder="Nome Completo"
                                    defaultValue={`${user.name}`}
                                />
                                <Input
                                    icon={FiKey}
                                    name="username"
                                    placeholder="Nome de Usuário"
                                    defaultValue={`${user.username}`}
                                />
                                <Select
                                    defaultValue={user.registerType}
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
                                        defaultValue={user.register}
                                        placeholder={selectedRegister.register}
                                        mask={selectedRegister.mask}
                                    />
                                )}
                                {selectedRegister.state && (
                                    <Select
                                        defaultValue={user.registerState}
                                        onChange={handleStateChange}
                                        name="registerState"
                                        icon={FiMap}
                                    >
                                        {states.map(({ name, initials }) => (
                                            <option
                                                value={initials}
                                                key={initials}
                                            >
                                                {`${initials} - ${name}`}
                                            </option>
                                        ))}
                                    </Select>
                                )}

                                <div className="avatar-change">
                                    {!removeAvatar ? (
                                        <div className="avatar">
                                            <h3>Foto de perfil</h3>
                                            <img
                                                src={
                                                    finalImage
                                                        ? URL.createObjectURL(
                                                              finalImage,
                                                          )
                                                        : `https://res.cloudinary.com/saudepp/image/upload/${user.imageId}.${user.imageType}`
                                                }
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
                                    ) : (
                                        <button
                                            type="button"
                                            className="noborder"
                                            onClick={() =>
                                                setRemoveAvatar(false)
                                            }
                                        >
                                            Restaurar foto
                                        </button>
                                    )}
                                    <Dropzone
                                        setFile={setFile}
                                        callback={() => setImageModal(true)}
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setPasswordModal(true);
                                    }}
                                >
                                    Alterar senha
                                </button>

                                <button type="submit">Salvar mudanças</button>
                            </>
                        )}
                    </FormStyle>
                </Form>
            </Container>
            <Footer />
        </>
    ) : (
        <Redirect to="/" />
    );
}
