import React from 'react';

import { Link } from 'react-router-dom';
import { Container } from './styles';

import Card from '../Card';

export default function CardGroup({ title, data }) {
   function parseData() {
      if (data) {
         return (
            <ul>
               {data.map((d) => (
                  <Card data={d} />
               ))}
            </ul>
         );
      }
      return (
         <ul>
            <li>
               <Card />
            </li>
            <li>
               <Card />
            </li>
            <li>
               <Card />
            </li>
            <li>
               <Card />
            </li>
         </ul>
      );
   }

   return (
      <Container>
         <div>
            <h1>{title}</h1>
            <hr />
            {parseData()}
            <Link to="/notices/">Outras notícias &gt;</Link>
         </div>
      </Container>
   );
}
