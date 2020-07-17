import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Header, Content } from './styles';

import logo from '../../assets/logoepitacio.png';

const Footer = () => {
   return (
      <Container>
         <div className="content">
            <Header>
               <h1>Saúde++ - Presidente Epitácio</h1>
               <hr />
            </Header>
            <Content>
               <div>
                  <h2>Acesso</h2>
                  <hr />
                  <div>
                     <Link to="/">
                        <p>Principal</p>
                     </Link>
                     <Link to="/notices">
                        <p>Notícias</p>
                     </Link>
                     <Link to="/faq">
                        <p>Dúvidas frequentes</p>
                     </Link>
                     <Link to="/about">
                        <p>Sobre nós</p>
                     </Link>
                  </div>
               </div>
               <div>
                  <h2>Contato</h2>
                  <hr />
                  <div>
                     <p>saude@presidenteepitacio.sp.gov.br</p>
                     <p>gabinete@presidenteepitacio.sp.gov.br</p>
                     <p>(18) 3281-2211</p>
                     <p>(18) 3281-9777</p>
                  </div>
               </div>
               <div>
                  <h2>Redes sociais</h2>
                  <hr />
                  <div>
                     <a href="https://www.facebook.com/Prefeitura-de-Presidente-Epitácio-603852299814825">
                        <p>Facebook</p>
                     </a>
                     <p>Instagram</p>
                     <p>YouTube</p>
                     <a href="http://www.presidenteepitacio.sp.gov.br">
                        <p>Site</p>
                     </a>
                  </div>
               </div>
               <div>
                  <h2>Equipe</h2>
                  <hr />
                  <div>
                     <p>Dev Nine Startup</p>
                     <p>www.devnine.com.br</p>
                  </div>
               </div>
            </Content>
            <div>
               <a
                  target="_blank"
                  href="http://www.presidenteepitacio.sp.gov.br/"
                  rel="noopener noreferrer"
               >
                  <img src={logo} alt="Presidente Epitácio" />
               </a>
            </div>
         </div>
      </Container>
   );
};

export default Footer;
