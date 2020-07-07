import React, { useEffect, useState } from 'react';
import axios from 'axios';
import parse from 'html-react-parser';

import { FiFrown } from 'react-icons/fi';

import loadingNotice from '../../assets/loadingNotice.png';

import Header from '../../components/Header';
import CoronaCard from '../../components/CoronaCard';
// import Comment from '../../components/Comment'
import Footer from '../../components/Footer';

import api from '../../services/api';

import { ContainerNoticia, TextContainer } from './styles';

export default function NoticeDisplay(props) {
   const { computedMatch } = props;
   const { params } = computedMatch;

   const [content, setContent] = useState({
      title: '',
      abstract: '',
      user: {
         name: '',
      },
      date: '',
      text: '',
   });

   const [isLoading, setIsLoading] = useState(true);

   function getMonthAsName(month) {
      switch (month + 1) {
         default:
            return '';
         case 1:
            return 'janeiro';
         case 2:
            return 'fevereiro';
         case 3:
            return 'março';
         case 4:
            return 'abril';
         case 5:
            return 'maio';
         case 6:
            return 'junho';
         case 7:
            return 'julho';
         case 8:
            return 'agosto';
         case 9:
            return 'setembro';
         case 10:
            return 'outubro';
         case 11:
            return 'novembro';
         case 12:
            return 'dezembro';
      }
   }

   useEffect(() => {
      let timer;
      const { CancelToken } = axios;
      const source = CancelToken.source();
      const { noticeId } = params;
      if (noticeId !== undefined) {
         api.get(`/notices/${noticeId}`, {
            cancelToken: source.token,
         })
            .then(({ data }) => {
               document.title = data.title || 'Notícia';
               setContent({
                  title: data.title,
                  text: data.text,
                  abstract: data.abstract,
                  user: data.user,
                  date: new Date(data.date),
               });
               setIsLoading(false);
               timer = setTimeout(() => {
                  api.get(`/notices/${noticeId}?viewed=true`, {
                     cancelToken: source.token,
                  });
               }, 15000);
            })
            .catch((err) => {
               if (axios.isCancel(err)) {
                  console.log('Notice API request cancelled.', err.message);
               } else {
                  setContent((prevContent) => ({
                     ...prevContent,
                     title: (
                        <>
                           Houve um erro ao carregar a notícia <FiFrown />
                        </>
                     ),
                  }));
                  setIsLoading(false);
               }
            });
      }
      return () => {
         source.cancel('Operation canceled by the user.');
         clearTimeout(timer);
      };
   }, [params]);

   return (
      <>
         <Header />
         <div style={{ marginBottom: 50 }} className="main">
            <CoronaCard />
            <ContainerNoticia>
               {isLoading ? (
                  <img
                     className="image-banner"
                     src={loadingNotice}
                     alt="Notice load"
                  />
               ) : (
                  <div>
                     <div className="container">
                        <div className="gradient" />
                        <div className="banner" />
                     </div>
                     <div className="header">
                        <h1>{content.title}</h1>
                        <p>{content.abstract}</p>
                        <p>
                           {content.user.name !== '' ? (
                              <>Escrito por {content.user.name} - </>
                           ) : undefined}{' '}
                           {content.date ? (
                              <>
                                 {content.date.getDate()} de{' '}
                                 {getMonthAsName(content.date.getMonth())} de{' '}
                                 {content.date.getFullYear()}
                              </>
                           ) : undefined}
                        </p>
                     </div>

                     <TextContainer>{parse(content.text)}</TextContainer>
                  </div>
               )}
            </ContainerNoticia>

            {/*                
		<ContainerComentario>
                    <h1>Comentários</h1>
                    <Comment 
                        name="Gustavo Patara" 
                        content="Somente álcool em gel é eficaz?"
                    />
                    <form>
                        <EscreverComentario>
                            <h2>Escreva seu comentário</h2>
                            <textarea placeholder="Escreva seu comentário aqui"/>
                            <button>Enviar</button>
                        </EscreverComentario>
                    </form>
                </ ContainerComentario>
		*/}
         </div>
         <Footer />
      </>
   );
}
