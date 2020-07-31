import React from 'react';

import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sobre } from './styles';
import { useAxios } from '../../services/api';

import CardGroup from '../../components/CardGroup';
import Header from '../../components/Header';
import CoronaCard from '../../components/CoronaCard';
import Footer from '../../components/Footer';

export default function Home() {
   const { data: notices } = useAxios('/notices?page=0&limit=4');

   useEffect(() => {
      document.title = 'Home';
   }, []);

   return (
      <>
         <Header />

         <div className="main">
            <CoronaCard />
            <Sobre>
               <p>
                  &emsp;A plataforma digital denominada Saúde++, visa atualizar
                  e orientar os cidadões do município de Presidente Epitácio,
                  trazendo dados e fatos verídicos em relação a pandemia do
                  Coronavírus e entre outras doenças que continuam presentes em
                  nossa sociedade, como a Dengue, Sarampo, entre outras.
               </p>
               <Link to="/about">Saiba mais</Link>
            </Sobre>

            <div>
               {notices ? (
                  <CardGroup title="Novas noticias" data={notices} />
               ) : (
                  <p>Carregando</p>
               )}
            </div>
         </div>

         <Footer />
      </>
   );
}
