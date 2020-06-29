import React, { useEffect, useState } from 'react'
import parse from 'html-react-parser'

import data from './testHtml.txt'

import Header from '../../components/Header'
import CoronaCard from '../../components/CoronaCard'
//import Comment from '../../components/Comment'
import Footer from '../../components/Footer';

import api from '../../utils/api';

import { ContainerNoticia, ContainerComentario, EscreverComentario, TextContainer } from './styles'

export default function NoticeDisplay(props) {

    const [content, setContent] = useState({
        title: "Como lavar as mãos",
        abstract: "Nessa epóca de pandemia, é extramente necessário lavar as mãos!",
        text: "",
        user: {
            name: "Leandro Ribeiro"
        }
    });
    
    function getMonthAsName(month) {
        switch(month){
            default:
                return "";
            case 1:
                return "janeiro";
            case 2:
                return "fevereiro";
            case 3:
                return "março";
            case 4:
                return "abril";
            case 5:
                return "maio";
            case 6:
                return "junho";
            case 7:
                return "julho";
            case 8:
                return "agosto";
            case 9:
                return "setembro";
            case 10:
                return "outubro";
            case 11:
                return "novembro";
            case 12:
                return "dezembro";
        }
    }

    useEffect(() => {
        const { noticeId } = props.match.params.noticeId;
        console.log(noticeId);
        if(noticeId === undefined){
            fetch(data)
            .then(res => res.text())
            .then(html => {
                setContent({
                    ...content,
                    text: html
                });
            })
        }else{
            api.get(`/notices/${noticeId}`).then(({ data }) => {
                
            }); 
        }
    }, [content, props.match.params, props.match.params.id]);

    return(
        <>
            <Header />
	    <div style={{ marginBottom: 50 }} className='main'>
                <CoronaCard />
                <ContainerNoticia>
                    <div>
                        <h1>{content.title}</h1>
                        <p>{content.abstract}</p>
                        <p>Escrito por {content.user.name} - 1 de abril de 2020</p>
                        <TextContainer>
                            {parse(content.text)}
                        </TextContainer>
                    </div>
                </ ContainerNoticia>
                
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
    )
}
