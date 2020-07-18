import React from 'react';

import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { FiX, FiSearch } from 'react-icons/fi';
import useSWR from 'swr';
import { Container, Table, TableHeader, TableLine, Button } from './styles';

import api from '../../services/api';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

async function getInfo(url) {
   console.log(url);
   const bearer = localStorage.getItem('@Saude:token');
   const response = await api.get(url, {
      headers: {
         Audivorization: `Bearer ${bearer}`,
      },
   });
   console.log(response.data);
   return response.data;
}

export default function Panel() {
   const { data: noticies } = useSWR('/notices', getInfo);

   useEffect(() => {
      document.title = 'Painel de controle';
   });

   return (
      <>
         <Header />
         <div className="main">
            <Container>
               <h1>Painel de Noticias</h1>
               <Table>
                  <TableHeader>
                     <div> Titulo </div>
                     <div> Data </div>
                     <div> Autor </div>
                     <div>
                        <Link to="register">+</Link>
                     </div>
                  </TableHeader>
                  {noticies ? (
                     noticies.map((n) => (
                        <TableLine>
                           <div id="noOverflow">{n.title}</div>
                           <div>{new Date(n.date).toLocaleDateString()}</div>
                           <div>{n.user.name}</div>
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
                     <tr>
                        <div> </div>
                        <div> </div>
                     </tr>
                  )}
               </Table>
            </Container>
         </div>

         <Footer />
      </>
   );
}
