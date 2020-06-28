import React from 'react'
import { Link } from 'react-router-dom';

import { Container } from './styles'

export default function Card({ data }) {
    if (!data) {
	data = {
		id: 19,
		title: "Como lavar as mãos",
		abstract: "Nessa época de pandemia, é extremamente necessário lavar as mãos!",
		user: {
		    name: 'Leandro R.'
		},
		date: "2020-06-26T13:00:27.664Z"
	    }
    }    

   return (
      
	<Link to={`/notices/${data.id}`} style={{ textDecoration: 'none', color: 'black' }}>
        <Container key={data.id}>
            <img alt='descrição' src='https://www.rbsdirect.com.br/imagesrc/17383078.jpg?w=700' />
            <div>
                <strong>{ data.title }</strong>
                <p>
                { data.abstract }
                </p>
                <span> { data.date } </span>
                <span> { data.user.name } </span>
            </div>
        </ Container>
      </Link>
   )
}
