import React, { useState, useEffect, useCallback } from 'react';

import { FiXCircle } from 'react-icons/fi';

import useSWR from 'swr';
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

import api, { useAxios } from '../../services/api';

const fetchNoticesByTags = async (url, tags) => {
   const formattedTags = tags.map((t) => t.id).join(',');

   const response = await api.get('/notices', {
      params: {
         tags: formattedTags,
      },
   });

   return response.data;
};

export default function ListNotices() {
   const { data: tags } = useAxios('/tags');
   const [selectedTags, setSelectedTags] = useState([]);
   const { data: notices } = useSWR(
      ['/notices', selectedTags],
      fetchNoticesByTags,
   );
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState('');

   useEffect(() => {
      document.title = 'Notícias';
   });

   const handleSelectCategory = useCallback(
      (id) => {
         id = Number(id);
         if (!id || selectedTags.some((tag) => tag.id === id)) {
            return;
         }

         const selectedTag = tags.find((t) => {
            return t.id === id;
         });

         setSelectedTags([...selectedTags, selectedTag]);
      },
      [selectedTags, tags],
   );

   const handleDeleteCategory = useCallback(
      (id) => {
         id = Number(id);
         const newTags = selectedTags.filter((t) => t.id !== id);

         setSelectedTags(newTags);
      },
      [selectedTags],
   );

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
                     {tags ? (
                        tags.map((item) => (
                           <option key={item.id} value={item.id}>
                              {item.description}
                           </option>
                        ))
                     ) : (
                        <p>Carregando</p>
                     )}
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
               {notices ? (
                  <ul>
                     {' '}
                     {notices.map((n) => (
                        <Card data={n} key={n.id} />
                     ))}{' '}
                  </ul>
               ) : (
                  error
               )}
            </ContainerNoticia>
         </div>
         <Footer />
      </>
   );
}
