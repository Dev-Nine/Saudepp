import React, { useState, useEffect } from 'react';

import Header from '../../components/Header';
import Footer from '../../components/Footer'
import Card from '../../components/Card';

import { ContainerNoticia, ContainerPesquisa, Search } from './styles';

import api from '../../utils/api';

export default function ListNotices() {
    const [tags, setTags]= useState([])

    useEffect(() => {
	api.get('/tags').then(({ data }) => {
	    const process = data.map(tag => ( tag.id ));
	    setTags(process);
	});
    }, []);

    return (
	<>
	    <Header/>
	    <div className="main">
		<ContainerPesquisa>
		    <h1>Pesquisar</h1>
		    
		    <Search>
			<select name="" id="" className="select-form">
			    {
				tags.map((item) => <option key={item} value={item}>{item}</option>)
			    }
			</select>
		    </Search>
		</ContainerPesquisa>
		
		<ContainerNoticia> 
		    <ul>
			<li><Card /></li>
			<li><Card /></li>
			<li><Card /></li>
			<li><Card /></li>
			<li><Card /></li>
			<li><Card /></li>
			<li><Card /></li>
			<li><Card /></li>
			<li><Card /></li>
			<li><Card /></li>	
		    </ul>
		</ContainerNoticia>
	    </div>
	    <Footer/>
	</>
    );
}
