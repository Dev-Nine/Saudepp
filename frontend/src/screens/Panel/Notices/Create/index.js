import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form } from '@unform/web';
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
import Input from '../../../../components/Input';
import getValidationErros from '../../../../utils/getValidationErros';

export default function Notice() {
    const history = useHistory();
    const [redirectMessage, setRedirectMessage] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);
    const [isDisabled, setIsDisabled] = useState(false);
    const [value, setValue] = useState([
        {
            type: 'p',
            children: [{ text: '' }],
        },
    ]);
    const [title, setTitle] = useState('');
    const [abstract, setAbstract] = useState('');

    const [imageModal, setImageModal] = useState(false);

    const [file, setFile] = useState();
    const [fileUrl, setFileUrl] = useState('');
    const [finalImage, setFinalImage] = useState(null);

    const formRef = useRef();

    const deleteImage = () => {
        setFinalImage(null);
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
                const notice = await serializeSlateToJson(object);
                const serializedTags = selectedTags.map((tag) => {
                    return { id: tag.id };
                });
                data = {
                    ...data,
                    text: notice,
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
                }

                api.post('/notices', data)
                    .then(() => {
                        setRedirectMessage(
                            'Notícia criada com sucesso! Redirecionando...',
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
        [finalImage, history, selectedTags, value],
    );

    return (
        <>
            <Header />
            <Container>
                <div className="content">
                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <NoticeBannerChangeModal
                            setFinalImage={setFinalImage}
                            isModalOpen={imageModal}
                            setIsModalOpen={setImageModal}
                            imageUrl={fileUrl}
                        />
                        <Input
                            value={title}
                            onChange={(e) => {
                                setTitle(e.target.value);
                            }}
                            name="title"
                            placeholder="Título"
                        />
                        <Input
                            value={abstract}
                            onChange={(e) => {
                                setAbstract(e.target.value);
                            }}
                            name="abstract"
                            placeholder="Resumo"
                        />
                        <TagSelector
                            selectedTags={selectedTags}
                            setSelectedTags={setSelectedTags}
                        />

                        <div className="banner-change">
                            {finalImage ? (
                                <div className="banner">
                                    <h3>Banner da notícia</h3>
                                    <img
                                        src={URL.createObjectURL(finalImage)}
                                        alt="Banner"
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

                        <p>Conteúdo</p>
                        <TextEditor value={value} setValue={setValue} />

                        <p>{redirectMessage}</p>
                        <div className="button-container">
                            <div className="button1">
                                <button
                                    type="submit"
                                    disabled={isDisabled}
                                    className={isDisabled ? 'disabled' : null}
                                >
                                    Criar notícia
                                </button>
                            </div>
                        </div>
                    </Form>
                </div>
            </Container>
            <Footer />
        </>
    );
}
