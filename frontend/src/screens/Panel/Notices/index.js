import React from 'react';

import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { FiX, FiSearch, FiPlus } from 'react-icons/fi';
import useSWR from 'swr';

import { confirmAlert } from 'react-confirm-alert'; // Import element
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

import api from '../../../services/api';

import { Container, Table, TableLine, Button } from './styles';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { useAuth } from '../../../hooks/AuthProvider';

async function getInfo(url) {
    const response = await api.get(url);
    return response.data;
}

export default function Panel() {
    const { user } = useAuth();
    const { data: notices, mutate } = useSWR(
        user.type === 0 ? '/notices' : `/notices/?userid=${user.id}`,
        getInfo,
    );

    useEffect(() => {
        document.title = 'Painel de controle';
    });

    function remove(id) {
        confirmAlert({
            title: 'Confirme a exclusão',
            message: 'Você tem certeza que deseja excluir?',
            buttons: [
                {
                    label: 'Sim',
                    onClick: async () => {
                        api.delete(`/notices/${id}`);
                        const updatedNotices = notices.filter((notice) => {
                            if (notice.id !== id) return true;
                            return false;
                        });
                        mutate(updatedNotices, false);
                    },
                },
                {
                    label: 'Não',
                },
            ],
        });
    }

    return (
        <>
            <Header />
            <div className="main">
                <Container>
                    <h1>Painel de Noticias</h1>
                    <Table>
                        <TableLine isHeader>
                            <div> Titulo </div>
                            <div> Data </div>
                            <div> Autor </div>
                            <div>
                                <Link to="register">
                                    <Button isCreate>
                                        <FiPlus />
                                    </Button>
                                </Link>
                            </div>
                        </TableLine>
                        {notices ? (
                            notices.map((n) => (
                                <TableLine key={n.id}>
                                    <div id="noOverflow">{n.title}</div>
                                    <div>
                                        {new Date(n.date).toLocaleDateString()}
                                    </div>
                                    <div>{n.user.name}</div>
                                    <div>
                                        <Link to="edit">
                                            <Button>
                                                <FiSearch />
                                            </Button>
                                        </Link>
                                        <Button
                                            onClick={() => {
                                                remove(n.id);
                                            }}
                                            isDelete
                                        >
                                            <FiX />
                                        </Button>
                                    </div>
                                </TableLine>
                            ))
                        ) : (
                            <div> Não há notícias... </div>
                        )}
                    </Table>
                </Container>
            </div>

            <Footer />
        </>
    );
}
