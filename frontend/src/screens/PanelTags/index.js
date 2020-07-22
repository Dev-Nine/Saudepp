import React from 'react';

import { FiSearch, FiX, FiPlus } from 'react-icons/fi';
import useSWR from 'swr';
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; // Import element
import { Container, Table, TableLine, Button } from './styles';

import api from '../../services/api';

import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

import Header from '../../components/Header';
import Footer from '../../components/Footer';

async function loadTags() {
   const { data } = await api.get('/tags');

   return data;
}

export default function PanelTags() {
   const { data: tags } = useSWR('/tags', loadTags);

   function remove(t) {
      confirmAlert({
         title: 'Confirme a exclusão',
         message: 'Você tem certeza que deseja excluir?',
         buttons: [
            {
               label: 'Sim',
               onClick: async () => {
                  const { status } = await api.delete(`/tags/${t.id}`);
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
               <h1>Painel de Categorias</h1>

               <Table>
                  <TableLine isHeader>
                     <div>Descrição</div>
                     <div>
                        <Link to="register">
                           <Button isCreate>
                              <FiPlus />
                           </Button>
                        </Link>
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
                              <Link to="#">
                                 <Button
                                    onClick={() => {
                                       remove(t);
                                    }}
                                    isDelete
                                 >
                                    <FiX />
                                 </Button>
                              </Link>
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
