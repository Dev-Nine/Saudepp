import React from 'react';
import { Link } from 'react-router-dom';

import showTime from '../../utils/showTime';

import { Container } from './styles';

import defaultCard from '../../image/defaultcard.png';

export default function Card({ data }) {
   if (!data) {
      data = {
         id: 19,
         title: 'Como lavar as mãos',
         abstract:
            'Nessa época de pandemia, é extremamente necessário lavar as mãos!',
         user: {
            name: 'Leandro R.',
         },
         date: '2020-06-26T13:00:27.664Z',
      };
   }

   return (
      <Link
         to={`/notices/${data.id}`}
         style={{ textDecoration: 'none', color: 'black' }}
      >
         <Container key={data.id}>
            <img
               alt="descrição"
               src={
                  data.imageId
                     ? `https://res.cloudinary.com/saudepp/image/upload/${data.imageId}.${data.imageType}`
                     : defaultCard
               }
            />
            <div>
               <strong>{data.title}</strong>
               <p>{data.abstract}</p>
               <span> {showTime(data.date)} </span>
               <span> {data.user.name} </span>
            </div>
         </Container>
      </Link>
   );
}
