import styled from 'styled-components';

export const ContainerPesquisa = styled.div`
    width: 100%;
    margin-bottom: 32px;
`;

export const ContainerNoticia = styled.div`
    background-color: #f9f7f7;
    padding: 16px 20px;
    border-radius: 10px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    margin-bottom: 20px;
    width: 100%;
    h1 {
        font-size: 30px;
        font-family: Roboto;
        font-style: normal;
        font-weight: bold;
        color: #000000;
    }
    ul {
        display: grid;
        grid-template-columns: repeat(4, minmax(200px, 300px));
        gap: 2rem;
        list-style: none;
    }
    @media (max-width: 1099px) {
        width: 100%;
        padding: 16px 12px;
        ul {
            grid-template-columns: repeat(1, 1fr);
        }
    }
`;
