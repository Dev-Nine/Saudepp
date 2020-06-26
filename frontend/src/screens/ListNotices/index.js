import React, { useState, useEffect } from 'react';

import Header from '../../components/Header';
import Footer from '../../components/Footer'
import Card from '../../components/Card';

import { ContainerNoticia, ContainerPesquisa, Search } from './styles';

import api from '../../utils/api';

export default function ListNotices() {
    const [tags, setTags]= useState([]);
    const [notices, setNotices] = useState([]);

    function searchNotices(e) {
	const value = e.target.value;
	console.log(value);
	api.get(`/notices?tag=${value}`).then(({ data }) => {
	    console.log(data);
	    setNotices(data);
	});
    }

    function loadNotices() {
	if (notices.length > 0) {
	    return(
		<ul>
		    {notices.map(not => <li><Card data={not}/></li>)}
		</ul>
	    );
	} else {
	    return(
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
		</ul>);
	}
    }

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
		    <form onSubmit={searchNotices}>
		    <h1>Pesquisar</h1>
		    
		    <Search>
			<select onChange={searchNotices} name="tags" id="tags" className="select-form">
			    <option value="" default> Selecione as categorias</option>
			    {
				tags.map((item) => <option key={item} value={item}>{item}</option>)
			    }
			</select>
		    </Search>
		    </form>
		</ContainerPesquisa>
		
		<ContainerNoticia> 
		    {
			loadNotices()
		    }
		</ContainerNoticia>
	    </div>
	    <Footer/>
	</>
    );
}
