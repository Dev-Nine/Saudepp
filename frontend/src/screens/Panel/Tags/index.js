import React, { useCallback, useRef, useState } from 'react';

import Modal from 'react-modal';

import * as Yup from 'yup';
import { FiSearch, FiX, FiPlus } from 'react-icons/fi';
import useSWR from 'swr';
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; // Import element

import { Form } from '@unform/core';
import { Container, Table, TableLine, Button, ModalContent } from './styles';

import api from '../../../services/api';

import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Input from '../../../components/Input';

async function loadTags() {
    const { data } = await api.get('/tags');
    return data;
}

Modal.setAppElement('#root');

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

export default function PanelTags() {
    const { data: tags, mutate } = useSWR('/tags', loadTags);
    const [modalIsOpen, setIsOpen] = useState(false);
    const formRef = useRef(null);

    function remove(id) {
        confirmAlert({
            title: 'Confirme a exclusão',
            message: 'Você tem certeza que deseja excluir?',
            buttons: [
                {
                    label: 'Sim',
                    onClick: async () => {
                        api.delete(`/tags/${id}`);
                        const updatedTags = tags.filter((tag) => {
                            if (tag.id !== id) return true;
                            return false;
                        });
                        mutate(updatedTags, false);
                    },
                },
                {
                    label: 'Não',
                },
            ],
        });
    }

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    async function handleSubmit(data) {
        console.log('aaa');
        formRef.current.setErrors({});
        const schema = Yup.object().shape({
            description: Yup.string().required('Informe uma descrição válida'),
        });

        await schema.validate(data, {
            abortEarly: false,
        });

        const res = await api.post('tags', data);
        console.log(res);
        closeModal();
    }

    return (
        <>
            <Header />
            <div className="main">
                <Container>
                    <h1>Painel de Categorias</h1>
                    <Table>
                        <TableLine isHeader>
                            <div>Descrição</div>
                            <div>
                                <Button isCreate onClick={() => openModal()}>
                                    <FiPlus />
                                </Button>
                            </div>
                        </TableLine>

                        {tags ? (
                            tags.map((t) => (
                                <TableLine key={t.id}>
                                    <div>{t.description}</div>
                                    <div>
                                        <Link to="edit">
                                            <Button>
                                                <FiSearch />
                                            </Button>
                                        </Link>
                                        <Button
                                            onClick={() => {
                                                remove(t.id);
                                            }}
                                            isDelete
                                        >
                                            <FiX />
                                        </Button>
                                    </div>
                                </TableLine>
                            ))
                        ) : (
                            <TableLine />
                        )}
                    </Table>
                </Container>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Exemplo"
                >
                    <h2>Cadastrar Tags</h2>
                    <button type="button" onClick={closeModal}>
                        X
                    </button>
                    <ModalContent>
                        <Form ref={formRef} onSubmit={handleSubmit}>
                            <Input name="description" placeholder="Descrição" />
                            <button type="submit">Cadastrar</button>
                        </Form>
                    </ModalContent>
                </Modal>
            </div>

            <Footer />
        </>
    );
}
