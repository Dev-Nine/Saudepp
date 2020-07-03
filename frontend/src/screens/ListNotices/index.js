import React, { useState, useEffect, useCallback } from 'react';

import { FiXCircle } from 'react-icons/fi';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Card from '../../components/Card';

import {
   ContainerNoticia,
   ContainerPesquisa,
   Search,
   TagButton,
   TagContainer,
} from './styles';

import api from '../../services/api';

export default function ListNotices() {
   const [tags, setTags] = useState([]);
   const [selectedTags, setSelectedTags] = useState([]);
   const [notices, setNotices] = useState([]);

   useEffect(() => {
      document.title = 'Notícias';
   });

   const handleSelectCategory = useCallback(
      (id) => {
         if (!id || selectedTags.includes(id)) {
            return;
         }

         setSelectedTags([...selectedTags, id]);
      },
      [selectedTags],
   );

   const handleDeleteCategory = useCallback(
      (id) => {
         const newTags = selectedTags.filter((item) => item !== id);

         setSelectedTags(newTags);
      },
      [selectedTags],
   );

   useEffect(() => {
      api.get(`/notices?tag=${selectedTags}`).then(({ data }) => {
         setNotices(
            data.map((d) => (
               <li key={d.id}>
                  <Card data={d} />
               </li>
            )),
         );
      });
   }, [selectedTags]);

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
                     onChange={(e) => handleSelectCategory(e.target.value)}
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

               <TagContainer>
                  {selectedTags.map((id) => (
                     <TagButton
                        onClick={() => {
                           handleDeleteCategory(id);
                        }}
                     >
                        <span>{tags[id - 1].description}</span>
                        <FiXCircle size={18} color="#fff" />
                     </TagButton>
                  ))}
               </TagContainer>
            </ContainerPesquisa>

            <ContainerNoticia>
               <ul>{notices}</ul>
            </ContainerNoticia>
         </div>
         <Footer />
      </>
   );
}
