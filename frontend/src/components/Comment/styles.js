import styled from 'styled-components'

export const Container = styled.div`
    background-color: #FFF;
    padding: 10px 50px;
    border-radius: 10px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    margin-top: 10px;

    div {
        display: flex;
        width: auto;
        align-items: center;
        padding-top: 10px;
    }

    p:nth-child(3){
        margin-left: auto;
    }

    p {
        font-style: normal;
    }

    div:nth-child(2) {
        box-shadow: inset 0px 4px 2px rgba(0, 0, 0, 0.25);
        border-radius: 8px;
        margin-top: 10px;
        padding: 15px 15px;
    }

    div img {
        border-radius: 100%;
        height: 60px;
        margin-right: 20px;
    }

    
`