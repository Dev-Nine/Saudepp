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
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      document.title = 'Notícias';
   });

   const handleSelectCategory = useCallback(
      (id) => {
         if (!id) {
            return;
         }

         const selectedTag = tags.find((t) => t.id === id);

         setSelectedTags([...selectedTags, selectedTag]);
      },
      [selectedTags, tags],
   );

   const handleDeleteCategory = useCallback(
      (id) => {
         const newTags = selectedTags.filter((t) => t.id !== id);

         setSelectedTags(newTags);
      },
      [selectedTags],
   );

   useEffect(() => {
      async function loadNotices() {
         setLoading(true);
         const foramttedTags = selectedTags.map((t) => t.id).join(',');

         try {
            const { data } = await api.get('notices', {
               params: {
                  tag: foramttedTags,
               },
            });

            setNotices(data);
         } finally {
            setLoading(false);
         }
      }

      loadNotices();
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
               <h1>Pesquisar {loading && ' - Carregando...'}</h1>

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
                  {selectedTags.map((item) => (
                     <TagButton
                        onClick={() => {
                           handleDeleteCategory(item.id);
                        }}
                        key={item.id}
                     >
                        <span>{item.description}</span>
                        <FiXCircle size={18} color="#fff" />
                     </TagButton>
                  ))}
               </TagContainer>
            </ContainerPesquisa>
            <ContainerNoticia>
               {notices.map((n) => (
                  <li key={n.id}>
                     <Card data={n} />
                  </li>
               ))}
            </ContainerNoticia>
         </div>
         <Footer />
      </>
   );
}
