import styled from 'styled-components'

export const ContainerNoticia = styled.div`
    background-color: #F9F7F7;
    padding: 0 40px;
    border-radius: 10px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

    h1, p {
        margin-bottom: 15px;
    }

    p {
        font-weight: 400;
        font-style: italic;
    }

    p + p {
        font-style: normal;
    }
`

export const ContainerComentario = styled.div`
    background-color: #F9F7F7;
    padding: 0 40px;
    border-radius: 10px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`