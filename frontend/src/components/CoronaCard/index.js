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
            let confirmed = localStorage.getItem('@Saude:confirmed');
            let deaths = localStorage.getItem('@Saude:deaths');
            let recovered = localStorage.getItem('@Saude:recovered');
            let time = localStorage.getItem('@Saude:time');

            // Data does not exist
            if (!(confirmed && deaths && recovered && time)) {
               // console.log('Data dont exist');
               //  console.log(confirmed, deaths, time);

               // I don't know why
               // But only works making this monster
               // If you want to change it
               // Good luck, you will need it
               const { data } = await api.get('/covid', {
                  cancelToken: source.token,
               });
               confirmed = data.confirmed.toLocaleString('pt');
               deaths = data.deaths.toLocaleString('pt');
               recovered = data.recovered.toLocaleString('pt');
               time = new Date();

               localStorage.setItem('@Saude:confirmed', confirmed);
               localStorage.setItem('@Saude:deaths', deaths);
               localStorage.setItem('@Saude:time', time);
               localStorage.setItem('@Saude:recovered', recovered);

               // console.log(confirmed, deaths, time);
               setCovid({
                  confirmed,
                  deaths,
                  recovered,
               });
            } else {
               // Verify if data is expired
               const diffHours =
                  new Date().getHours() - new Date(time).getHours();

               // console.log(diffHours);
               if (diffHours >= 1) {
                  // I don't know why
                  // But only works making this monster
                  // If you want to change it
                  // Good luck, you will need it
                  const { data } = await api.get('/covid', {
                     cancelToken: source.token,
                  });
                  confirmed = data.confirmed.toLocaleString('pt');
                  recovered = data.recovered.toLocaleString('pt');
                  deaths = data.deaths.toLocaleString('pt');
                  time = new Date();

                  localStorage.setItem('@Saude:confirmed', confirmed);
                  localStorage.setItem('@Saude:recovered', recovered);
                  localStorage.setItem('@Saude:deaths', deaths);
                  localStorage.setItem('@Saude:time', time);
               }

               // console.log(confirmed, deaths, time);
               setCovid({
                  confirmed,
                  deaths,
                  recovered,
               });
            }
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
               <strong style={{ color: '#93C9FF' }}>{covid.recovered} </strong>
            </p>
            <p>Recuperados</p>

            <p>
               <strong>{covid.confirmed}</strong>
            </p>
            <p>Casos confirmados</p>

            <p>
               <strong style={{ color: '#ff3333' }}>{covid.deaths} </strong>
            </p>
            <p>Óbitos confirmados</p>
         </div>
      </Container>
   );
}
