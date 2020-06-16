import styled from 'styled-components'

export const Container = styled.div`
    background: #ffffff;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 8px;

    .menu{
        max-width: 100%;
        display: flex;
        margin: 0 auto;
        padding: 10px;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
    }
    .menu-logo a{
        font-size: 30px;
        font-weight: bold;
        padding: 0 10px;
        text-decoration: none;
        color: #0094DE;
    }

    .menu-logo p{
        font-weight: bold;
        margin-left: 10px;
        color: black;
    }

    nav ul{
        display: flex;
        flex-wrap: wrap;
        margin: 0;
        padding: 0;
        list-style: none;
    }

    nav a {
        font-size: 18px;
        font-weight: bold;
        color: #0094DE;
        text-decoration: none;
        margin: 0 10px;
        padding: 10px;
        transition: filter 0.2s;
    }
    nav a:hover{
        filter: brightness(80%);
    }

    @media(max-width: 600px){
        nav ul{
            display: flex;
            flex-direction: column;
            margin-top: 10px;
        }
        nav a{
            padding: 10px;
            text-align: center;
            background: #333333;
            margin-bottom: 5px;
            border-radius: 4px;
        }
    }
`

