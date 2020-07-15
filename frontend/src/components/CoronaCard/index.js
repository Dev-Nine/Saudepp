import React from 'react';
import { useAxios } from '../../services/api';

import { Container } from './styles';

export default function CoronaCard() {
   const { data: covid } = useAxios('/covid');

   if (!covid) {
      return (
         <Container>
            <div className="corona-text">
               <h1 style={{ textAlign: 'center' }}>Carregando</h1>
            </div>
         </Container>
      );
   }

   return (
      <Container>
         <div className="corona-text">
            <h1>CORONA VIRUS</h1>
            <p>
               Fique em <strong>CASA</strong>
               <br />
               Se <strong>PREVINA</strong>
            </p>
         </div>
         <div className="corona-data">
            <p>
               <strong style={{ color: 'cyan' }}>
                  {covid.recovered.toLocaleString('pt')}
               </strong>
            </p>
            <p>Recuperados</p>

            <p>
               <strong>{covid.confirmed.toLocaleString('pt')}</strong>
            </p>
            <p>Casos confirmados</p>

            <p>
               <strong style={{ color: '#ff3333' }}>
                  {covid.deaths.toLocaleString('pt')}
               </strong>
            </p>
            <p>Óbitos confirmados</p>
         </div>
      </Container>
   );
}
