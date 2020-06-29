import React from 'react'

import { Container } from './styles'

import Card from '../Card'
import { Link } from 'react-router-dom';

export default function CardGroup({title, type, data}) {
    function parseData () {
    
	if (data) {
	    return (
		<ul>
		    {data.map(d => <Card data={d}/>)}
		</ul>
	    );
	} else { 
	    return (
		<ul>
		    <li><Card/></li>
		    <li><Card/></li>
		    <li><Card/></li>	
		    <li><Card/></li>
		</ul>
	    );
	}
    }

    return (
      <Container>
         <div>
            <h1>{title}</h1>
            <hr />
	    { parseData() } 
			<Link to="/notices/">Outras notícias &gt;</Link>
         </div>
      </ Container>
   )
}
