import React from 'react';

import { useEffect, useState } from 'react';

import { Container } from './styles';

import api from '../../services/api';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function Panel() {
   const [users, setUsers] = useState([]);

   useEffect(() => {
      document.title = 'Painel de controle';
   });

   useEffect(() => {
      async function getInfo() {
         const bearer = localStorage.getItem('@Saude:token');
         const response = await api.get('/users', {
            headers: {
               Authorization: `Bearer ${bearer}`,
            },
         });
         console.log(response.data);
      }

      getInfo();
   }, []);

   return (
      <>
         <Header />

         <div className="main">
            <Container>
               <h1>Painel de usuarios</h1>
               <div>
                  <table>
                     <thead>
                        <th> id </th>
                        <th> Name </th>
                     </thead>
                     <tbody>
                        {
                           users.map(u => (<tr><td>u.id</td><td>u.name</td></tr>))
                        }
                     </tbody>
                  </table>
               </div>
            </Container>
         </div>

         <Footer />
      </>
   );
}
