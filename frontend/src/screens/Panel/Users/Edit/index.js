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
import ReactCrop from 'react-image-crop';
import { Redirect } from 'react-router-dom';

import axios from 'axios';
import { useEffect } from 'react';
import Modal from 'react-modal';

import Input from '../../../../components/Input';
import Select from '../../../../components/Select';
import Header from '../../../../components/Header';
import Footer from '../../../../components/Footer';
import Dropzone from '../../../../components/Dropzone';

import modalStyle from '../../../../styles/ModalStyle';

import getValidationErros from '../../../../utils/getValidationErros';
import { Container } from './styles';
import api from '../../../../services/api';
import setMap from '../../../../utils/registerMap';
import getCroppedImage from '../../../../utils/getCroppedImage';
import resizeImage from '../../../../utils/resizeImage';
import 'react-image-crop/dist/ReactCrop.css';
import { useAuth } from '../../../../hooks/AuthProvider';

Modal.setAppElement(document.getElementById('root'));

export default function Edit(props) {
    const history = useHistory();
    const registerMap = setMap();
    const { user: authUser } = useAuth();

    // modal
    const [passwordModal, setPasswordModal] = useState(false);

    const { computedMatch } = props;
    const { params } = computedMatch;
    const { userId } = params;

    const [isLoading, setIsLoading] = useState(true);

    const [user, setUser] = useState({});

    const [selectedRegister, setSelectedRegister] = useState({});
    const [selectedState, setSelectedState] = useState();
    const [states, setStates] = useState([]);

    const token = localStorage.getItem('@Saude:token');

    useEffect(() => {
        api.get(`/users/${userId}`, {
            headers: {
                authorization: `Bearer ${token}`,
            },
        }).then((response) => {
            setUser(response.data);
            setIsLoading(false);
        });
    }, [setIsLoading, token, userId]);

    const formRef = useRef(null);
    const passwordFormRef = useRef(null);

    const [file, setFile] = useState();
    const [fileUrl, setFileUrl] = useState('');
    const imgRef = useRef(null);
    const originalImgRef = useRef(null);

    const [crop, setCrop] = useState({ aspect: 1, width: 50, unit: '%' });
    const [finalCrop, setFinalCrop] = useState(null);

    const [finalImage, setFinalImage] = useState(null);

    const onImageCropLoad = (img) => {
        const originalImage = new Image();
        originalImage.src = fileUrl;
        imgRef.current = img;
        originalImgRef.current = originalImage;
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

                console.log(user);
                console.log(data);

                try {
                    const res = await api.put(
                        `/users/${user.id}`,
                        { ...data },
                        {
                            headers: {
                                authorization: `Bearer ${token}`,
                            },
                        },
                    );
                } catch (err) {
                    console.log({ err });
                }

                // history.push('/panel/users/');
            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    const erros = getValidationErros(err);
                    passwordFormRef.current.setErrors(erros);
                }
            }
        },
        [token, user],
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

                console.log(data);

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

                // await api.post('users', {
                //     ...data,
                //     type: 2,
                // });

                // history.push('/panel/users/');
            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    const erros = getValidationErros(err);

                    formRef.current.setErrors(erros);
                }
            }
        },
        [finalImage, selectedRegister.test],
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
        if (finalCrop && imgRef.current) {
            getCroppedImage(
                imgRef.current,
                originalImgRef.current,
                finalCrop,
                'avatar',
            ).then((img) => {
                const resizedImage = new Image();
                resizedImage.src = URL.createObjectURL(img);
                resizedImage.onload = () => {
                    if (resizedImage.height > 600) {
                        resizeImage(resizedImage, 600, 'avatar_preview').then(
                            (resized) => {
                                setFinalImage(resized);
                            },
                        );
                    } else {
                        setFinalImage(img);
                    }
                };
            });
        }
    }, [finalCrop]);

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
                <Modal
                    isOpen={passwordModal}
                    onRequestClose={() => setPasswordModal(false)}
                    contentLabel="Example Modal"
                    style={modalStyle}
                >
                    <Container>
                        <Form
                            ref={passwordFormRef}
                            onSubmit={handlePasswordChange}
                        >
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
                            <button type="submit">Alterar senha</button>

                            <button
                                type="button"
                                onClick={() => setPasswordModal(false)}
                            >
                                close
                            </button>
                        </Form>
                    </Container>
                </Modal>

                <Form ref={formRef} onSubmit={handleSubmit}>
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
                                    defaultValue={`${user.register}`}
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

                            {file ? (
                                <div className="avatar-selection">
                                    <ReactCrop
                                        className="crop"
                                        src={fileUrl}
                                        crop={crop}
                                        onImageLoaded={onImageCropLoad}
                                        onChange={(c) => setCrop(c)}
                                        onComplete={(c) => setFinalCrop(c)}
                                    />
                                    {finalImage ? (
                                        <div className="preview">
                                            <h3>Prévia</h3>
                                            <img
                                                src={URL.createObjectURL(
                                                    finalImage,
                                                )}
                                                alt="Preview"
                                                style={{ height: 150 }}
                                            />
                                        </div>
                                    ) : null}
                                </div>
                            ) : null}
                            <button
                                type="button"
                                onClick={() => {
                                    setPasswordModal(true);
                                }}
                            >
                                Alterar senha
                            </button>

                            <Dropzone setFile={setFile} />

                            <button type="submit">Criar Conta</button>
                        </>
                    )}
                </Form>
            </Container>
            <Footer />
        </>
    );
}
