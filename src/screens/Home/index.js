import React from 'react'

import './styles.css'

import Card from '../../components/Card'

export default function Home() {
   return (
      <div id='main'>
         <Card title='Novas noticias' data='' type='new' />
         <Card title='Recomendações' data='' type='rec' />
         <Card title='Saúde e bem estar' data='' type='health' />
      </div>
   )
}