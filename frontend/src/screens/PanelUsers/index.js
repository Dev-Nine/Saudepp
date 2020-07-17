import React from 'react';

import { useEffect } from 'react';

import useSWR from 'swr';
import { Container } from './styles';

import api from '../../services/api';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

async function getInfo() {
   const bearer = localStorage.getItem('@Saude:token');
   const response = await api.get('/users', {
      headers: {
         Authorization: `Bearer ${bearer}`,
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
               <div>
                  <table>
                     <thead>
                        <th> ID </th>
                        <th> Name </th>
                     </thead>
                     <tbody>
                        {users ? (
                           users.map((u) => (
                              <tr>
                                 <td id="center">{u.id}</td>
                                 <td>{u.name}</td>
                              </tr>
                           ))
                        ) : (
                           <tr>
                              <td> </td>
                              <td> </td>
                           </tr>
                        )}
                     </tbody>
                  </table>
               </div>
            </Container>
         </div>

         <Footer />
      </>
   );
}
