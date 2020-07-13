import React from 'react';

import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiUsers, FiFileText, FiTag } from 'react-icons/fi';
import { Container } from './styles';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import PanelButton from '../../components/PanelButton';

export default function Panel() {
   useEffect(() => {
      document.title = 'Painel de controle';
   });

   return (
      <>
         <Header />

         <div className="main">
            <Container>
               <h1>Painel de controle</h1>
               <p className="description">
                  Esta é a sua tela de manutenção para notícias, profissionais e
                  categorias (tags). Clique em algum dos botões abaixo, ou na
                  barra ao lado, para navegar e fazer as alterações necessárias.
               </p>
               <div>
                  <Link to="/panel/users/">
                     <PanelButton
                        icon={<FiUsers size={32} />}
                        text="Profissionais"
                     />
                  </Link>
                  <Link to="/panel/notices/">
                     <PanelButton
                        icon={<FiFileText size={32} />}
                        text="Notícias"
                     />
                  </Link>
                  <Link to="/panel/tags/">
                     <PanelButton icon={<FiTag size={32} />} text="Tags" />
                  </Link>
               </div>
            </Container>
         </div>

         <Footer />
      </>
   );
}
