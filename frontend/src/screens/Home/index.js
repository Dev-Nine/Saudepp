import React from 'react'

import './styles.css'

import Card from '../../components/Card'
import Header from '../../components/Header';

export default function Home() {
   return (
      <>
         <Header />
         <div id='main'>
            <div id='corona_info'>
                  <span>
                     CORONA <strong>VIRUS</strong>
                  </span>
                  <span>
                     Fique em <strong>CASA</strong>
                  </span>
                  <span>
                     Se <strong>PREVINA</strong>
                  </span>
                  <span>
                     78.162 Casos confirmados
                  </span>
                  <span>
                     5.466 Óbitos confirmados
                  </span>
            </div>

            <div id="sobre">
               <p>
                  A plataforma digital denominada Saúde++, visa atualizar e orientar os cidadãos 
                  da cidade de Presidente Epitácio, trazendo dados e fatos verídicos 
                  em relação a pandemia do Coronavírus e entre outras doenças que continuam presentes na nossa sociedade, como a Dengue.
               </p>
            </div>

            <div className="cards">
               <Card title='Novas noticias' data='' type='new' />
               <Card title='Recomendações' data='' type='rec' />
               <Card title='Saúde e bem estar' data='' type='health' />
            </div>
         </div>
      </>
   )
}