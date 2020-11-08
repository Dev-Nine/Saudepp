import React, { useState } from 'react';

import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { FiX, FiSearch, FiPlus } from 'react-icons/fi';
import useSWR from 'swr';

import { confirmAlert } from 'react-confirm-alert'; // Import element
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

import { Container, Table, TableLine, Button } from './styles';

import api from '../../../services/api';

import Header from '../../../components/Header';
import Footer from '../../../components/Footer';

import PageSelector from '../../../components/PageSelector';

async function loadUsers(url, setTotalCount, setIsLoading) {
    const res = await api.get(url);
    setTotalCount(Number(res.headers['x-total-count']));
    setIsLoading(false);
    return res.data;
}

export default function Panel() {
    const [totalCount, setTotalCount] = useState(1);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const { data: users, mutate } = useSWR(
        ['/professionals', setTotalCount, setIsLoading],
        loadUsers,
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
                        // sem await, delete otimista
                        api.delete(`/users/${id}`);
                        const updatedUsers = users.filter((user) => {
                            if (user.id !== id) return true;
                            return false;
                        });
                        mutate(updatedUsers, false);
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
                    <h1>Painel de usuarios</h1>
                    {isLoading ? (
                        <p>Carregando...</p>
                    ) : (
                        <Table>
                            <PageSelector
                                totalCount={totalCount}
                                currentPage={page}
                                setCurrentPage={setPage}
                                itemsPerPage={8}
                            />
                            <TableLine isHeader>
                                <div> Name </div>
                                <div>
                                    <Link to="create">
                                        <Button isCreate>
                                            <FiPlus />
                                        </Button>
                                    </Link>
                                </div>
                            </TableLine>
                            {users ? (
                                users.map((u) => (
                                    <TableLine key={u.id}>
                                        <div>{u.name}</div>
                                        <div>
                                            <Link to={`edit/${u.id}`}>
                                                <Button>
                                                    <FiSearch />
                                                </Button>
                                            </Link>
                                            <Button
                                                onClick={() => remove(u.id)}
                                                isDelete
                                            >
                                                <FiX />
                                            </Button>
                                        </div>
                                    </TableLine>
                                ))
                            ) : (
                                <div />
                            )}
                        </Table>
                    )}
                </Container>
            </div>

            <Footer />
        </>
    );
}
