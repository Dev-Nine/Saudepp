import React from 'react'

import Header from '../../components/Header'
import CoronaCard from '../../components/CoronaCard'
import Comment from '../../components/Comment'

import { ContainerNoticia, ContainerComentario } from './styles'

export default function NoticeDisplay() {

    return(
        <>
            <Header />
            <div className='main'>
                <CoronaCard />
                <ContainerNoticia>
                    <div>
                        <h1>Como lavar as mãos</h1>
                        <p>Nessa epóca de pandemia, é extramente necessário lavar as mãos!</p>
                        <p>Escrito por Leandro R. - 1 de abril de 2020,</p>
                    </div>
                        
                </ ContainerNoticia>
                <ContainerComentario>
                    <h1>Comentários</h1>
                    <Comment />
                </ ContainerComentario>
            </div>
            
        </>
    )
}