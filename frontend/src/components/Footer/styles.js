import styled from 'styled-components'

export const Container = styled.div`
    background-color: #333333;
    color: #EAEAEA;
    padding: 6%;

    img {
        width: 30%;
    }

    p {
        font-weight: 400;
        margin-bottom: 20px;
    }

    hr {
        width: 40%;
    }

    @media only screen and (max-width: 1099px){
        img {
            width: 70%;
        }
    }
`

export const Header = styled.div`
    margin-bottom: 40px;
    hr {
        width: 40%;
    }

    @media only screen and (max-width: 1099px){
        margin-bottom: 16px;

        h1 {
            font-size: 24px;
        }

        hr {
            display: none;
        }
    }
`

export const Content = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 40px;

    hr {
        width: 200px;
        margin-bottom: 20px;
    }

    @media only screen and (max-width: 1099px){
        flex-direction: column;

        h2 {
            margin-top: 10px;
            font-size: 20px;
        }

        hr {
            width: 100%;
        }

        p {
            margin-bottom: 16px;
        }
    }
`