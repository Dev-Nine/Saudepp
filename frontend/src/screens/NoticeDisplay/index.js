import React, { useEffect, useState } from 'react'
import parse from 'html-react-parser'

import data from './testHtml.txt'
import loadingNotice from '../../assets/loadingNotice.png'

import Header from '../../components/Header'
import CoronaCard from '../../components/CoronaCard'
//import Comment from '../../components/Comment'
import Footer from '../../components/Footer';

import api from '../../utils/api';

import { ContainerNoticia, ContainerComentario, EscreverComentario, TextContainer } from './styles'

export default function NoticeDisplay(props) {

    const [content, setContent] = useState({
        title: "",
        abstract: "",
        user: {
            name: ""
        },
        date : "",
        text: ""
    });

    const [isLoading, setIsLoading] = useState(true)
    
    function getMonthAsName(month) {
        switch(month + 1){
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
        const { noticeId } = props.match.params;
        console.log(noticeId);
        if(noticeId !== undefined){
            api.get(`/notices/${noticeId}`).then(({ data }) => {
                console.log(data);
                setContent({
                    title: data.title,
                    text: data.text,
                    abstract: data.abstract,
                    user: data.user,
                    date : new Date(data.date),
                });
            })
            .catch(err => {
                alert(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
        }
    }, [props.match.params]);

    return(
        <>
            <Header />
	    <div style={{ marginBottom: 50 }} className='main'>
                <CoronaCard />
                <ContainerNoticia>
                    { isLoading ? <img src={loadingNotice}/> :
                    <div>
                        <h1>{content.title}</h1>
                        <p>{content.abstract}</p>
                        { content.date === "" ? undefined :
                        <p>
                            Escrito por {content.user.name} - {content.date.getDate()} de {getMonthAsName(content.date.getMonth())} de {content.date.getFullYear()}
                        </p>
                        }
                        <TextContainer>
                            {parse(content.text)}
                        </TextContainer>
                    </div>
                    }
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
