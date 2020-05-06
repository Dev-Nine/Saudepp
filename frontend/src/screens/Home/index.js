import React, {useState, useEffect} from 'react'

import './styles.css'

import Card from '../../components/Card'
import Header from '../../components/Header';
import api from '../../utils/api';

export default function Home() {
   const [covid, setCovid] = useState({})

   useEffect( () => {
      async function loadCovidData() {
         const response = await api.get('/covid')
         setCovid(response.data); 
      }

      loadCovidData()
   }, [])

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
                     {covid.contagion} Casos confirmados
                  </span>
                  <span>
                     {covid.deaths} Óbitos confirmados
                  </span>
            </div>

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
      </>
   )
}