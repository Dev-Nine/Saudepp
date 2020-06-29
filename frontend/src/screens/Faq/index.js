import React from 'react'

import { Container } from './styles'

import Header from '../../components/Header';
import Footer from '../../components/Footer'

export default function Faq() {

   return (
      <>
         <Header />

         <div className='main'>
            <Container>
               <h1>Saúde++ - Dúvidas frequentes</h1>

            </Container>
         </div>

         <Footer />
      </>
   )
}