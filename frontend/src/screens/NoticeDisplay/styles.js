import styled from 'styled-components'

export const ContainerNoticia = styled.div`
    background-color: #F9F7F7;
    padding: 15px 40px;
    border-radius: 10px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    margin-bottom: 20px;
    width: 100%;
    max-width:1300px;

    h1, p {
        margin-bottom: 15px;
    }

    p:nth-child(2) {
        font-weight: 400;
        font-style: italic;
        color: #4A4A4A;
    }
`


export const ContainerComentario = styled.div`
    background-color: #F9F7F7;
    padding: 20px 40px;
    border-radius: 10px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`

export const EscreverComentario = styled.div`
    background-color: #FFF;
    padding: 20px 50px;
    border-radius: 10px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    margin-top: 20px;
    display: flex;
    flex-direction: column;

    textarea { 
        margin-top: 20px;
        box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
        border-radius: 8px;
        width: 100%;
        height: 160px;
        padding: 15px;

        border: none;
        resize: none;
        outline: none;
    }

    button{
        width: 120px;
        height: 35px;
        background: #77C6FF;
        font-weight: 500;
        color: white;
        align-self: flex-end;
        border-radius: 8px;
        margin-top: 10px;
    }
`

export const TextContainer = styled.div`

    ol, ul {
        list-style-position: inside;
    }

    a {
        text-decoration: inherit;
        color: #0094DE;
    }

    img {
        display: block;
        margin-left: auto;
        margin-right: auto;
        text-align: center;
        max-width: 70%;
        max-height: 30%
    }
`
