import React, { useEffect, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
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

export default function Notice(props) {
    const history = useHistory();
    const { user: authUser } = useAuth();

    const { computedMatch } = props;
    const { params } = computedMatch;
    const { noticeId } = params;

    const [notice, setNotice] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        api.get(`/notices/${noticeId}`).then((response) => {
            if (
                Number(response.data.user.id) === authUser.id ||
                authUser.type === 0
            ) {
                setNotice(response.data);
                setIsLoading(false);
            } else {
                history.push('..');
            }
        });
    }, [authUser.id, authUser.type, history, noticeId]);
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

    const deleteImage = () => {
        setFinalImage(null);
    };

    useEffect(() => {
        if (file) setFileUrl(URL.createObjectURL(file));
    }, [file]);

    useEffect(() => {
        if (notice.text) setValue(JSON.parse(notice.text));
    }, [notice]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let data;
        setIsDisabled(true);
        let object;
        // eslint-disable-next-line prefer-const
        object = JSON.parse(JSON.stringify(value));
        const notice = await serializeSlateToJson(object);
        return;
        const serializedTags = selectedTags.map((tag) => {
            return { id: tag.id };
        });
        data = {
            title,
            abstract,
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
                    'Notícia alterada com sucesso! Redirecionando...',
                );
                setTimeout(() => {
                    history.push('/panel/notices/');
                }, 3000);
            })
            .catch((err) => {
                console.log({ err });
                setIsDisabled(false);
            });
    };

    return (
        <>
            <Header />
            <Container>
                <div className="content">
                    <form>
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
                                <p>Título</p>
                                <input
                                    type="text"
                                    value={notice.title}
                                    onChange={(e) => {
                                        setNotice({
                                            ...notice,
                                            text: e.target.value,
                                        });
                                    }}
                                    placeholder="Titulo..."
                                />

                                <p>Resumo</p>
                                <input
                                    type="text"
                                    value={notice.abstract}
                                    onChange={(e) => {
                                        setNotice({
                                            ...notice,
                                            abstract: e.target.value,
                                        });
                                    }}
                                    placeholder="Resumo..."
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
                                                src={URL.createObjectURL(
                                                    finalImage,
                                                )}
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
                                            onClick={handleSubmit}
                                            disabled={isDisabled}
                                            className={
                                                isDisabled ? 'disabled' : null
                                            }
                                        >
                                            Enviar
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </form>
                </div>
            </Container>
            <Footer />
        </>
    );
}
