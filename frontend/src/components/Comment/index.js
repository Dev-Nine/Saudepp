import React from 'react'

import { Container } from './styles'

export default function Comment(props) {
    const { name, content } = props;
    return (
        <Container>
            <div>
                <img 
                    src="https://avatars1.githubusercontent.com/u/44099109?s=460&v=4" 
                    alt="Avatar"
                />
                <h3>{name}</h3>
                <p>1 de abril de 2020, 13:51</p>
            </div>
            
            <div>
                <p>{content}</p>
            </div>
        </Container>
    )
}