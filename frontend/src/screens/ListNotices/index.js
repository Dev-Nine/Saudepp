import React, { useState, useEffect } from 'react';

import useSWR from 'swr';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Card from '../../components/Card';

import { ContainerNoticia, ContainerPesquisa } from './styles';

import api from '../../services/api';
import TagSelector from '../../components/TagSelector';

const fetchNoticesByTags = async (url, selTags) => {
    let config;
    if (selTags) config = { params: { tags: selTags } };

    const response = await api.get('/notices', config);

    return response.data;
};

export default function ListNotices() {
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

    return (
        <>
            <Header />
            <div className="main">
                <ContainerPesquisa>
                    <h1>Pesquisar</h1>

                    <TagSelector
                        selectedTags={selectedTags}
                        setSelectedTags={setSelectedTags}
                    />
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
