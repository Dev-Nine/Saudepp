import React, { useState, useEffect, useCallback } from 'react';

import { FiXCircle } from 'react-icons/fi';

import useSWR from 'swr';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Card from '../../components/Card';

import {
    ContainerNoticia,
    ContainerPesquisa,
    Search,
    TagButton,
    TagContainer,
} from './styles';

import api, { useAxios } from '../../services/api';

const fetchNoticesByTags = async (url, selTags) => {
    let config;
    if (selTags) config = { params: { tags: selTags } };

    const response = await api.get('/notices', config);

    return response.data;
};

export default function ListNotices() {
    const { data: tags, mutate } = useAxios('/tags');
    const [selectedTags, setSelectedTags] = useState([]);
    const { data: notices, error } = useSWR(
        [
            '/notices',
            selectedTags[0]
                ? selectedTags.map((t) => t.id).join(',')
                : undefined,
        ],
        fetchNoticesByTags,
    );

    useEffect(() => {
        document.title = 'Notícias';
    });

    let message = <p>Carregando</p>;
    if (error) message = <p>Notícias não encontradas</p>;

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

    return (
        <>
            <Header />
            <div className="main">
                <ContainerPesquisa>
                    <h1>Pesquisar</h1>

                    <Search>
                        <select
                            onChange={(e) =>
                                handleSelectCategory(e.target.value)
                            }
                            name="tags"
                            id="tags"
                            className="select-form"
                        >
                            <option value="">Selecione as categorias</option>
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
                </ContainerPesquisa>
                <ContainerNoticia>
                    {notices ? (
                        <ul>
                            {notices.map((n) => (
                                <Card data={n} key={n.id} />
                            ))}
                        </ul>
                    ) : (
                        message
                    )}
                </ContainerNoticia>
            </div>
            <Footer />
        </>
    );
}
