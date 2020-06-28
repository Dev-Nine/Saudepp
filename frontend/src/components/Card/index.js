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

    function showTime(date){
        date = new Date(date);
        const currentDate = new Date();
        const diff = currentDate.getTime() - date.getTime();
        if(diff < 60000) // less than 1 minute
            return "Publicado agora!"
        if(diff < 3600000){ // less than 1 hour
            var mins = parseInt(diff / 60000);
            if(mins === 1)
                return `Publicado a 1 minuto`
            return `Publicado a ${mins} minutos`
        }
        if(diff < 86400000){ // less than a day
            var hours = parseInt(diff / 3600000);
            if(hours === 1)
                return `Publicado a 1 hora`
            return `Publicado a ${hours} horas`
        }else{
            return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}, 
                às ${date.getHours()}:${("0" + String(date.getMinutes())).slice(-2)}`
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
                <span> { showTime(data.date) } </span>
                <span> { data.user.name } </span>
            </div>
        </ Container>
      </Link>
   )
}
