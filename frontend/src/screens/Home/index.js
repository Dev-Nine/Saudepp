import React, { useState } from 'react';

import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Sobre } from './styles';
import api from '../../services/api';

import CardGroup from '../../components/CardGroup';
import Header from '../../components/Header';
import CoronaCard from '../../components/CoronaCard';
import Footer from '../../components/Footer';

export default function Home() {
   const [notices, setNotices] = useState([]);

   useEffect(() => {
      document.title = 'Home';
   }, []);

   useEffect(() => {
      const { CancelToken } = axios;
      const source = CancelToken.source();
      api.get('/notices?page=0&limit=4', {
         cancelToken: source.token,
      })
         .then(({ data }) => {
            setNotices(data);
         })
         .catch((err) => {});

      return () => {
         source.cancel('Operation canceled by the user.');
      };
   }, []);

   return (
      <>
         <Header />

         <div className="main">
            <CoronaCard />
            <Sobre>
               <p>
                  &emsp;A plataforma digital denominada Saúde++, visa atualizar
                  e orientar os cidadãos da cidade de Presidente Epitácio,
                  trazendo dados e fatos verídicos em relação a pandemia do
                  Coronavírus e entre outras doenças que continuam presentes na
                  nossa sociedade, como a Dengue.
               </p>
               <Link to="/about">Saiba mais</Link>
            </Sobre>

            <div>
               <CardGroup title="Novas noticias" data={notices} />
            </div>
         </div>

         <Footer />
      </>
   );
}
