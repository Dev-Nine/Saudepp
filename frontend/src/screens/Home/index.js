import React, {useState, useEffect} from 'react'

import './styles.css'

import Card from '../../components/Card'
import Header from '../../components/Header';
import api from '../../utils/api';

import image from '../../image/coronavirus-4833754_1920-1230x450.jpg'

export default function Home() {
   const [covid, setCovid] = useState({})

   useEffect( () => {
      async function loadCovidData() {
         const { data } = await api.get('/covid')
         setCovid({
            contagion: data.contagion.toLocaleString('pt'),
            deaths: data.deaths.toLocaleString('pt')
         }); 
      }

      loadCovidData()
   }, [])

   return (
      <>
         <Header />
         <div id='main'>
            <div id='corona_container' style={{borderRadius: 8, backgroundImage: `url(${image})`, width: '100%', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'}}>                  
               <div id='corona_info'>
                  <div style={{marginLeft: 41, marginTop: 57}}>
                     <p style={{fontSize: 55, marginBottom: 10}}>
                        CORONA VIRUS
                     </p>
                     <p>
                        Fique em <strong>CASA</strong>
                        <br/>
                        Se <strong>PREVINA</strong>
                     </p>
                  </div>
                  <div style={{marginTop: 85, marginLeft: '30%',display: 'grid', height: 66,gridTemplateRows: '50% 50%'}}>
                     <p style={{display: 'grid', gridTemplateColumns: '30% 70%'}}>
                        <strong>
                           {covid.contagion}
                        </strong> 
                        Casos confirmados
                     </p>
                     <p style={{display: 'grid', gridTemplateColumns: '30% 70%'}}>
                        <strong style={{color: 'red'}}>
                        {covid.deaths} 
                        </strong>
                        
                        Óbitos confirmados
                     </p>
                  </div>

               </div>
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