import React, { useRef, useCallback, useState } from 'react';

import Modal from 'react-modal';

import * as Yup from 'yup';
import { FiSearch, FiX, FiPlus } from 'react-icons/fi';
import useSWR from 'swr';
import { confirmAlert } from 'react-confirm-alert'; // Import element

import { Form } from '@unform/web';
import { Container, Table, TableLine, Button, ModalContent } from './styles';

import getValidationErros from '../../../utils/getValidationErros';
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

export default function PanelTags() {
    const { data: tags, mutate } = useSWR('/tags', loadTags);
    const [createIsOpen, setCreateIsOpen] = useState(false);
    const [editIsOpen, setEditIsOpen] = useState(false);
    const [editValue, setEditValue] = useState('');
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

    const handleCreateSubmit = useCallback(
        async (data) => {
            try {
                formRef.current.setErrors({});
                const schema = Yup.object().shape({
                    description: Yup.string()
                        .min(2, 'Precisa de pelo menos 2 caracteres')
                        .required('Informe uma descrição válida'),
                });

                await schema.validate(data, {
                    abortEarly: false,
                });

                api.post('tags', data).then((res) => {
                    tags.unshift(res.data[0]);
                    tags.pop();
                    mutate(tags, false);
                    setCreateIsOpen(false);
                });
            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    const erros = getValidationErros(err);
                    formRef.current.setErrors(erros);
                }
            }
        },
        [mutate, tags],
    );

    const handleEditSubmit = useCallback(
        async (data) => {
            try {
                formRef.current.setErrors({});
                const schema = Yup.object().shape({
                    description: Yup.string()
                        .min(2, 'Precisa de pelo menos 2 caracteres')
                        .required('Informe uma descrição válida'),
                });

                await schema.validate(data, {
                    abortEarly: false,
                });

                await api.put(`tags/${editValue.id}`, data).then(() => {
                    const updatedTags = tags.map((tag) => {
                        if (tag.id === editValue.id)
                            tag.description = editValue.description;
                        return tag;
                    });
                    mutate(updatedTags, false);
                    setEditIsOpen(false);
                });
            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    const erros = getValidationErros(err);
                    formRef.current.setErrors(erros);
                }
            }
        },
        [editValue.description, editValue.id, mutate, tags],
    );

    return (
        <>
            <Header />
            <div className="main">
                <Modal
                    isOpen={createIsOpen}
                    onRequestClose={() => {
                        setCreateIsOpen(false);
                    }}
                    className="modal"
                >
                    <ModalContent>
                        <button
                            type="button"
                            onClick={() => {
                                setCreateIsOpen(false);
                            }}
                            className="close"
                        >
                            <FiX size="32px" />
                        </button>
                        <Form ref={formRef} onSubmit={handleCreateSubmit}>
                            <h2>Cadastrar Tags</h2>
                            <Input name="description" placeholder="Descrição" />
                            <button type="submit">Cadastrar</button>
                        </Form>
                    </ModalContent>
                </Modal>
                <Modal
                    isOpen={editIsOpen}
                    onRequestClose={() => {
                        setEditIsOpen(false);
                    }}
                    className="modal"
                >
                    <ModalContent>
                        <button
                            type="button"
                            onClick={() => {
                                setEditIsOpen(false);
                            }}
                            className="close"
                        >
                            <FiX size="32px" />
                        </button>
                        <Form ref={formRef} onSubmit={handleEditSubmit}>
                            <h2>Alterar Tag</h2>
                            <Input
                                value={editValue.description}
                                onChange={(e) => {
                                    setEditValue({
                                        ...editValue,
                                        description: e.target.value,
                                    });
                                }}
                                name="description"
                                placeholder="Descrição"
                            />
                            <button type="submit">Salvar</button>
                        </Form>
                    </ModalContent>
                </Modal>
                <Container>
                    <h1>Painel de Categorias</h1>
                    <Table>
                        <TableLine isHeader>
                            <div>Descrição</div>
                            <div>
                                <Button
                                    isCreate
                                    onClick={() => {
                                        setCreateIsOpen(true);
                                    }}
                                >
                                    <FiPlus />
                                </Button>
                            </div>
                        </TableLine>

                        {tags ? (
                            tags.map((t) => (
                                <TableLine key={t.id}>
                                    <div>{t.description}</div>
                                    <div>
                                        <Button
                                            onClick={() => {
                                                setEditValue({
                                                    id: t.id,
                                                    description: t.description,
                                                });
                                                setEditIsOpen(true);
                                            }}
                                        >
                                            <FiSearch />
                                        </Button>
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
            </div>
            <Footer />
        </>
    );
}
