import React, { useEffect } from 'react';

import { FiSearch, FiX } from 'react-icons/fi';
import useSWR from 'swr';
import { Container, Table, TableHeader, TableLine, Button } from './styles';

import api from '../../services/api';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

async function loadTags() {
   const { data } = await api.get('/tags');

   return data;
}

export default function PanelTags() {
   const { data: tags } = useSWR('/tags', loadTags);

   return (
      <>
         <Header />
         <div className="main">
            <Container>
               <h1>Painel de Tag's</h1>

               <Table>
                  <TableHeader>
                     <div>Descrição</div>
                     <div>+</div>
                  </TableHeader>

                  {tags ? (
                     tags.map((t) => (
                        <TableLine key={t.id}>
                           <div>{t.description}</div>
                           <div>
                              <Button>
                                 <FiSearch />
                              </Button>
                              <Button isDelete>
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
