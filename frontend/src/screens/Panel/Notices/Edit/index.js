import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form } from '@unform/web';
import { useRef } from 'react';
import * as Yup from 'yup';
import Dropzone from '../../../../components/Dropzone';
import { Container } from './styles';
import Header from '../../../../components/Header';
import Footer from '../../../../components/Footer';
import TextEditor from '../../../../components/TextEditor';
import api from '../../../../services/api';
import TagSelector from '../../../../components/TagSelector';
import NoticeBannerChangeModal from '../../../../components/NoticeBannerChangeModal';
import serializeSlateToJson from '../../../../utils/serializeSlateToJson';
import { useAuth } from '../../../../hooks/AuthProvider';
import Input from '../../../../components/Input';
import getValidationErros from '../../../../utils/getValidationErros';

export default function Notice(props) {
    const history = useHistory();
    const { user: authUser } = useAuth();
    const formRef = useRef();

    const { computedMatch } = props;
    const { params } = computedMatch;
    const { noticeId } = params;

    const [notice, setNotice] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const [redirectMessage, setRedirectMessage] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);
    const [isDisabled, setIsDisabled] = useState(false);
    const [value, setValue] = useState([
        {
            type: 'p',
            children: [{ text: '' }],
        },
    ]);

    const [imageModal, setImageModal] = useState(false);

    const [file, setFile] = useState();
    const [fileUrl, setFileUrl] = useState('');
    const [finalImage, setFinalImage] = useState(null);

    const [removeBanner, setRemoveBanner] = useState(false);

    useEffect(() => {
        api.get(`/notices/${noticeId}`).then((response) => {
            if (
                Number(response.data.user.id) === authUser.id ||
                authUser.type === 0
            ) {
                const { data } = response;
                setNotice(data);
                setValue(JSON.parse(data.text));
                setSelectedTags(data.tags);
                setIsLoading(false);
            } else {
                history.push('..');
            }
        });
    }, [authUser, history, noticeId]);

    const deleteImage = () => {
        setFinalImage(null);
        setRemoveBanner(true);
    };

    useEffect(() => {
        if (file) setFileUrl(URL.createObjectURL(file));
    }, [file]);

    const handleSubmit = useCallback(
        async (data) => {
            setIsDisabled(true);
            try {
                formRef.current.setErrors({});
                const schema = Yup.object().shape({
                    title: Yup.string()
                        .min(5, 'Mínimo de 5 caracteres')
                        .max(100, 'Máximo de 100 caracteres')
                        .required('Campo obrigatório'),
                    abstract: Yup.string()
                        .min(5, 'Mínimo de 5 caracteres')
                        .max(150, 'Máximo de 150 caracteres')
                        .required('Campo obrigatório'),
                });
                await schema.validate(data, {
                    abortEarly: false,
                });

                let object;
                // eslint-disable-next-line prefer-const
                object = JSON.parse(JSON.stringify(value));
                const text = await serializeSlateToJson(object);
                const serializedTags = selectedTags.map((tag) => {
                    return { id: tag.id };
                });
                data = {
                    ...data,
                    text,
                    tags: serializedTags,
                };

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
                } else if (removeBanner) {
                    data = {
                        ...data,
                        imageId: null,
                    };
                }

                api.put(`/notices/${noticeId}`, data)
                    .then((res) => {
                        setRedirectMessage(
                            'Notícia alterada com sucesso! Redirecionando...',
                        );
                        setTimeout(() => {
                            history.push('/panel/notices/');
                        }, 3000);
                    })
                    .catch((err) => {
                        setIsDisabled(false);
                    });
            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    const erros = getValidationErros(err);
                    formRef.current.setErrors(erros);
                    setIsDisabled(false);
                }
            }
        },
        [finalImage, history, noticeId, removeBanner, selectedTags, value],
    );

    return (
        <>
            <Header />
            <Container>
                <div className="content">
                    <Form ref={formRef} onSubmit={handleSubmit}>
                        {isLoading ? (
                            <p>Carregando notícia...</p>
                        ) : (
                            <>
                                <NoticeBannerChangeModal
                                    setFinalImage={setFinalImage}
                                    isModalOpen={imageModal}
                                    setIsModalOpen={setImageModal}
                                    imageUrl={fileUrl}
                                />
                                <Input
                                    value={notice.title}
                                    onChange={(e) => {
                                        setNotice({
                                            ...notice,
                                            title: e.target.value,
                                        });
                                    }}
                                    name="title"
                                    placeholder="Título"
                                />
                                <Input
                                    value={notice.abstract}
                                    onChange={(e) => {
                                        setNotice({
                                            ...notice,
                                            abstract: e.target.value,
                                        });
                                    }}
                                    name="abstract"
                                    placeholder="Resumo"
                                />

                                <TagSelector
                                    selectedTags={selectedTags}
                                    setSelectedTags={setSelectedTags}
                                />

                                <div className="banner-change">
                                    {finalImage ||
                                    (notice.imageId && !removeBanner) ? (
                                        <div className="banner">
                                            <h3>Banner da notícia</h3>
                                            <img
                                                src={
                                                    finalImage
                                                        ? URL.createObjectURL(
                                                              finalImage,
                                                          )
                                                        : `https://res.cloudinary.com/saudepp/image/upload/${notice.imageId}.${notice.imageType}`
                                                }
                                                alt="Banner"
                                            />
                                            <button
                                                type="button"
                                                className="noborder"
                                                onClick={deleteImage}
                                            >
                                                Remover banner
                                            </button>
                                        </div>
                                    ) : (
                                        notice.imageId && (
                                            <button
                                                type="button"
                                                className="noborder"
                                                onClick={() =>
                                                    setRemoveBanner(false)
                                                }
                                            >
                                                Restaurar banner
                                            </button>
                                        )
                                    )}
                                    <Dropzone
                                        setFile={setFile}
                                        callback={() => setImageModal(true)}
                                    />
                                </div>

                                <p>Conteúdo</p>
                                <TextEditor value={value} setValue={setValue} />

                                <p>{redirectMessage}</p>
                                <div className="button-container">
                                    <div className="button1">
                                        <button
                                            type="submit"
                                            onClick={handleSubmit}
                                            disabled={isDisabled}
                                            className={
                                                isDisabled ? 'disabled' : null
                                            }
                                        >
                                            Salvar mudanças
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </Form>
                </div>
            </Container>
            <Footer />
        </>
    );
}
