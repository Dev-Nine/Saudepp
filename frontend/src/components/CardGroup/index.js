import React from 'react'

import { Container } from './styles'

import Card from '../Card'

export default function CardGroup({title, type, data}) {
   return (
      <Container>
         <div>
            <h1>{title}</h1>
            <hr />
            <ul>
               <li><Card /></li>
               <li><Card /></li>
               <li><Card /></li>
               <li><Card /></li>
            </ul>
         </div>
      </ Container>
   )
}