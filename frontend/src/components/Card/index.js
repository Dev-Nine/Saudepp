import React from 'react'

import { Container } from './styles'

export default function Card() {
   return (
      <Container>
         <img alt='descrição' src='https://www.rbsdirect.com.br/imagesrc/17383078.jpg?w=700' />
         <div>
            <strong>Como lavar as mãos</strong>
            <p>
               Nessa época de pandemia, é extremamente necessário lavar as mãos!
            </p>
            <span>Postado a 5 minutos</span>
            <span>Leandro R.</span>
         </div>
      </ Container>
   )
}