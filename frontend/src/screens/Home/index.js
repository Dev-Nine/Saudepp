import React from 'react'

import { Sobre } from './styles'

import CardGroup from '../../components/CardGroup'
import Header from '../../components/Header';
import CoronaCard from '../../components/CoronaCard'
import Footer from '../../components/Footer'
import { useEffect } from 'react';

export default function Home() {
   useEffect(() => {
      document.title = "Home"
   })
   
   return (
      <>
         <Header />

         <div className='main'>
            <CoronaCard />
            <Sobre>
               <p>
                  &emsp;A plataforma digital denominada Saúde++, visa atualizar e orientar os cidadãos 
                  da cidade de Presidente Epitácio, trazendo dados e fatos verídicos 
                  em relação a pandemia do Coronavírus e entre outras doenças que continuam presentes na nossa sociedade, como a Dengue.
               </p>
               <a href="#">Saiba mais</a>
            </ Sobre>

            <div>
               <CardGroup title='Novas noticias' data='' type='new' />
               <CardGroup title='Saúde e bem estar' data='' type='health' />
            </div>
         </div>

         <Footer />
      </>
   )
}