import React from 'react'

import './styles.css'

export default function Notice() {
   return (
      <div id='notice'>
         <img alt='descrição' src='https://www.rbsdirect.com.br/imagesrc/17383078.jpg?w=700' />
         <div id='text'>
            <strong>Como lavar as mãos</strong>
            <p>
               Nessa época de pandemia, é extremamente necessáio lavar as mãos
            </p>
            <span>Postado a 5 minutos</span>
            <span>Leandro R.</span>
         </div>
      </div>
   )
}