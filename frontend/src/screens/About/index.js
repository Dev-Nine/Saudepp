import React, { useEffect } from 'react';

import { Container } from './styles';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function About() {
   useEffect(() => {
      document.title = 'Sobre nós';
   });

   return (
      <>
         <Header />

         <div className="main">
            <Container>
               <h1>Sobre nós</h1>
               <div>
                  <p>
                     &emsp;&emsp;A plataforma digital denominada Saúde++, visa
                     atualizar e orientar os cidadãos da cidade de Presidente
                     Epitácio - SP, trazendo dados e fatos verídicos em relação
                     a pandemia do Coronavírus e entre outras doenças que
                     continuam presentes na nossa sociedade, como a Dengue.
                     Sendo assim, a equipe Dev Nine se uniu com o propósito de
                     ajudar a população epitaciana transmitindo toda a
                     informação de maneira simples e acessível para que todos
                     tenham em mãos as notícias sobre a situação que está
                     afetando o mundo.
                  </p>
                  <p>
                     &emsp;&emsp;Nós da Dev Nine, somos estudantes cursando
                     Bacharelado em Ciência da Computação, que iniciaram um
                     projeto singular, o qual ainda está em evolução e tem o
                     intuito de criar plataformas online e outras ferramentas
                     digitais para facilitar ainda mais a vida das pessoas.
                  </p>
               </div>
            </Container>
         </div>

         <Footer />
      </>
   );
}
