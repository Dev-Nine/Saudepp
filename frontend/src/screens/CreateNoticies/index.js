import React from 'react';

import { Container } from './styles';
import Header from '../../components/Header';

export default function Comments() {
   return (
      <>
         <Header />
         <Container>
            <div className="content">
               <div className="form">
                  <form>
                     <p>Título</p>
                     <input type="text" placeholder="Titulo" />

                     <p>Resumo da Noticia</p>
                     <input type="text" placeholder="Resumo da notícia" />

                     <p>Conteúdo</p>
                     <textarea
                        type="text"
                        placeholder="Conteúdo"
                        cols="30"
                        rows="5"
                     />

                     <div className="button-container">
                        <div className="button1">
                           <button type="submit">Anexar Imagem</button>
                           <button type="submit">Enviar</button>
                        </div>

                        <div className="button2">
                           <button type="submit">Limpar</button>
                        </div>
                     </div>
                  </form>
               </div>
            </div>
         </Container>
      </>
   );
}
