import React from 'react';

import { Container } from './styles';

import api from '../../services/api';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function PanelTags() {
   return (
      <>
         <Header />
         <div className="main">
            <Container>
               <h1>Painel de Tag's</h1>
               <table>
                  <thead>
                     <tr>
                        <td>Descrição</td>
                        <td>Icone de +</td>
                     </tr>
                  </thead>
                  <tbody>
                     <tr>
                        <td>Covid 19</td>
                        <td>outros icones</td>
                     </tr>
                  </tbody>
               </table>
            </Container>
         </div>

         <Footer />
      </>
   );
}
