import React, { useEffect, useState } from 'react';
import axios from 'axios';

import api from '../../services/api';
import { Container } from './styles';

export default function CoronaCard() {
   const [covid, setCovid] = useState({});

   const { CancelToken } = axios;

   useEffect(() => {
      const source = CancelToken.source();
      async function loadCovidData() {
         try {
            const { data } = await api.get('/covid', {
               cancelToken: source.token,
            });
            setCovid({
               confirmed: data.confirmed.toLocaleString('pt'),
               deaths: data.deaths.toLocaleString('pt'),
            });
         } catch (err) {
            if (axios.isCancel(err)) {
               console.log('Covid-19 API request cancelled.', err.message);
            }
         }
      }

      loadCovidData();
   }, [CancelToken]);

   useEffect(() => {
      const source = CancelToken.source();
      return () => {
         source.cancel('Operation canceled by the user.');
      };
   });

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
               <strong>{covid.confirmed}</strong>
            </p>
            <p>Casos confirmados</p>
            <p>
               <strong style={{ color: 'red' }}>{covid.deaths} </strong>
            </p>
            <p>Óbitos confirmados</p>
         </div>
      </Container>
   );
}
