import React from 'react'
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
`

export const Header = styled.div`
    margin-bottom: 40px;
    hr {
        width: 40%;
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
`