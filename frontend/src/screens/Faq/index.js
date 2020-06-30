import React, { useEffect } from 'react'

import { Container } from './styles'

import Header from '../../components/Header';
import Footer from '../../components/Footer'
import { Link } from 'react-router-dom';

export default function Faq() {
   useEffect(() => {
      document.title = "Dúvidas Frequentes"
   })

   return (
      <>
         <Header />

         <div className='main'>
            <Container>
               <h1>Saúde++ - Dúvidas frequentes</h1>
               <ul>
                  <li>
                     <Link to="/faq/covid19">
                        <h2>Informações sobre o novo corona vírus</h2>
                     </Link>
                  </li>
               </ul>
               
            </Container>
         </div>

         <Footer />
      </>
   )
}