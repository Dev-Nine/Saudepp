import React, { useEffect, useState } from 'react'
import parse from 'html-react-parser'

import data from './testHtml.txt'

import Header from '../../components/Header'
import CoronaCard from '../../components/CoronaCard'
import Comment from '../../components/Comment'

import { ContainerNoticia, ContainerComentario, EscreverComentario, TextContainer } from './styles'

export default function NoticeDisplay() {

    const [content, setContent] = useState('');

    useEffect(() => {
        fetch(data)
        .then(res => res.text())
        .then(html => {
            setContent(html);
        })
    }, []);

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
                        <TextContainer>
                            {parse(content)}
                        </TextContainer>
                    </div>
                </ ContainerNoticia>
                
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
            </div>
            
        </>
    )
}