import React from 'react';

import { Container, Table, TableLine } from './styles';

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
                  <TableLine>
                     <div>a</div>
                     <div>a</div>
                  </TableLine>
               </Table>
            </Container>
         </div>

         <Footer />
      </>
   );
}
