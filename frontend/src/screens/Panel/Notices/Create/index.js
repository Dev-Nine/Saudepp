import React, { useCallback, useState } from 'react';
import sanitizeHtml from 'sanitize-html';
import { FiXCircle } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import { Container, Search, TagContainer, TagButton } from './styles';
import Header from '../../../../components/Header';
import Footer from '../../../../components/Footer';
import TextEditor from '../../../../components/TextEditor';
import getEditorTextAsHTML from '../../../../utils/getEditorTextAsHTML';
import api, { useAxios } from '../../../../services/api';

export default function Notice() {
    const history = useHistory();
    const { data: tags, mutate } = useAxios('/tags');
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

    const handleSelectCategory = useCallback(
        (id) => {
            id = Number(id);
            if (!id || selectedTags.some((tag) => tag.id === id)) {
                return;
            }

            const selectedTag = tags.find((t) => {
                return t.id === id;
            });

            setSelectedTags([...selectedTags, selectedTag]);

            const updatedTags = tags.filter((tag) => tag.id !== id);
            mutate(updatedTags, false);
        },
        [mutate, selectedTags, tags],
    );

    const handleDeleteCategory = useCallback(
        (id) => {
            id = Number(id);
            const updatedTags = tags;
            const newTags = selectedTags.filter((t) => {
                if (t.id === id) {
                    updatedTags.push(t);
                    return false;
                }
                return true;
            });
            setSelectedTags(newTags);
            mutate(updatedTags, false);
        },
        [mutate, selectedTags, tags],
    );

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
            .then((res) => {
                console.log(res);
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

                        <Search>
                            <select
                                onChange={(e) =>
                                    handleSelectCategory(e.target.value)
                                }
                                name="tags"
                                id="tags"
                                className="select-form"
                            >
                                <option value="">
                                    Selecione as categorias
                                </option>
                                {tags
                                    ? tags.map((item) => (
                                          <option key={item.id} value={item.id}>
                                              {item.description}
                                          </option>
                                      ))
                                    : 'Carregando'}
                            </select>
                        </Search>
                        <TagContainer>
                            {selectedTags.map((item) => (
                                <TagButton
                                    onClick={() => {
                                        handleDeleteCategory(item.id);
                                    }}
                                    key={item.id}
                                >
                                    <span>{item.description}</span>
                                    <FiXCircle size={18} color="#fff" />
                                </TagButton>
                            ))}
                        </TagContainer>
                        <br />

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
