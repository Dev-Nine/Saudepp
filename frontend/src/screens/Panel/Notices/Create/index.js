import React, { useEffect, useState } from 'react';
import sanitizeHtml from 'sanitize-html';
import { useHistory } from 'react-router-dom';
import Dropzone from '../../../../components/Dropzone';
import { Container } from './styles';
import Header from '../../../../components/Header';
import Footer from '../../../../components/Footer';
import TextEditor from '../../../../components/TextEditor';
import getEditorTextAsHTML from '../../../../utils/getEditorTextAsHTML';
import api from '../../../../services/api';
import TagSelector from '../../../../components/TagSelector';
import NoticeBannerChangeModal from '../../../../components/NoticeBannerChangeModal';

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

    const deleteImage = () => {
        setFinalImage(null);
    };

    useEffect(() => {
        if (file) setFileUrl(URL.createObjectURL(file));
    }, [file]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsDisabled(true);
        const notice = await getEditorTextAsHTML(value);
        const clean = sanitizeHtml(notice, {
            allowedTags: [
                'strong',
                'em',
                'h1',
                'h2',
                'h3',
                'ul',
                'ol',
                'li',
                'img',
                'a',
                'p',
            ],
            allowedAttributes: {
                img: ['src'],
                a: ['href'],
            },
        });
        const serializedTags = selectedTags.map((tag) => {
            return { id: tag.id };
        });
        const data = {
            title,
            abstract,
            text: clean,
            tags: serializedTags,
        };
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
                console.log({ err });
            });
    };

    return (
        <>
            <Header />
            <Container>
                <div className="content">
                    <form>
                        <NoticeBannerChangeModal
                            setFinalImage={setFinalImage}
                            isModalOpen={imageModal}
                            setIsModalOpen={setImageModal}
                            imageUrl={fileUrl}
                        />
                        <p>Título</p>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => {
                                setTitle(e.target.value);
                            }}
                            placeholder="Titulo..."
                        />

                        <p>Resumo</p>
                        <input
                            type="text"
                            value={abstract}
                            onChange={(e) => {
                                setAbstract(e.target.value);
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
                                    onClick={handleSubmit}
                                    disabled={isDisabled}
                                    className={isDisabled ? 'disabled' : null}
                                >
                                    Enviar
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </Container>
            <Footer />
        </>
    );
}
