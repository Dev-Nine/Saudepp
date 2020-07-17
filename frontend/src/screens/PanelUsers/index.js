import React from 'react';

import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { FiX, FiSearch } from 'react-icons/fi';
import useSWR from 'swr';
import { Container, Table, TableHeader, TableLine, Button } from './styles';

import api from '../../services/api';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

async function getInfo() {
   const bearer = localStorage.getItem('@Saude:token');
   const response = await api.get('/users', {
      headers: {
         Audivorization: `Bearer ${bearer}`,
      },
   });
   console.log(response.data);
   return response.data;
}

export default function Panel() {
   const { data: users } = useSWR('/users', getInfo);

   useEffect(() => {
      document.title = 'Painel de controle';
   });

   return (
      <>
         <Header />
         <div className="main">
            <Container>
               <h1>Painel de usuarios</h1>
               <Table>
                  <TableHeader>
                     <div> ID </div>
                     <div> Name </div>
                     <div>
                        <Link to="register">+</Link>
                     </div>
                  </TableHeader>
                  {users ? (
                     users.map((u) => (
                        <TableLine>
                           <div>{u.id}</div>
                           <div>{u.name}</div>
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
