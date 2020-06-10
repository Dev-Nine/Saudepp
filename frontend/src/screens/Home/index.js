import React from 'react'

import './styles.css'

import Card from '../../components/Card'
import Header from '../../components/Header';
import CoronaCard from '../../components/CoronaCard'
import Footer from '../../components/Footer'

export default function Home() {

   return (
      <>
         <Header />

         <div className='main'>
            <CoronaCard />
            <div id="sobre">
               <p>
                  A plataforma digital denominada Saúde++, visa atualizar e orientar os cidadãos 
                  da cidade de Presidente Epitácio, trazendo dados e fatos verídicos 
                  em relação a pandemia do Coronavírus e entre outras doenças que continuam presentes na nossa sociedade, como a Dengue.
               </p>
               <a href="#">Sobre nós</a>
            </div>

            <div className="cards">
               <Card title='Novas noticias' data='' type='new' />
               <Card title='Recomendações' data='' type='rec' />
               <Card title='Saúde e bem estar' data='' type='health' />
            </div>
         </div>

         <Footer />
      </>
   )
}