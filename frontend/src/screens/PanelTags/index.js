import React from 'react';

import { Container, Table, TableHeader, TableLine } from './styles';

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

               <Table>
                  <TableHeader>
                     <div>Descrição</div>
                     <div>+</div>
                  </TableHeader>
                  <TableLine>
                     <div>Covid 19</div>
                     <div>+ ou X</div>
                  </TableLine>
               </Table>
            </Container>
         </div>

         <Footer />
      </>
   );
}
