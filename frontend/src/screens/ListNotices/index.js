import React, { useState, useEffect } from 'react';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Card from '../../components/Card';

import { ContainerNoticia, ContainerPesquisa, Search } from './styles';

import api from '../../services/api';

export default function ListNotices() {
   const [tags, setTags] = useState([]);
   const [selected, setSelected] = useState('');
   const [notices, setNotices] = useState([]);

   useEffect(() => {
      document.title = 'Notícias';
   });

   useEffect(() => {
      api.get(`/notices?tag=${selected}`).then(({ data }) => {
         setNotices(
            data.map((d) => (
               <li key={d.id}>
                  <Card data={d} />
               </li>
            )),
         );
      });
   }, [selected]);

   useEffect(() => {
      api.get('/tags').then(({ data }) => {
         setTags(data);
      });
   }, []);

   return (
      <>
         <Header />
         <div className="main">
            <ContainerPesquisa>
               <h1>Pesquisar</h1>

               <Search>
                  <select
                     onChange={(e) => setSelected(e.target.value)}
                     key=""
                     name="tags"
                     id="tags"
                     className="select-form"
                  >
                     <option value="">Selecione as categorias</option>
                     {tags.map((item) => (
                        <option key={item.id} value={item.id}>
                           {item.description}
                        </option>
                     ))}
                  </select>
               </Search>
            </ContainerPesquisa>

            <ContainerNoticia>
               <ul>{notices}</ul>
            </ContainerNoticia>
         </div>
         <Footer />
      </>
   );
}
