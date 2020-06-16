import React, {Component} from 'react';

import { Container } from './styles'

 class Header extends Component{
    render(){
        return(
        <React.Fragment>
            <Container>
                <div className="menu">
                    <div className="menu-logo">
                        <a href="#">Saúde++</a>
                        <p>Presidente Epitácio</p>
                    </div>
                    <nav className="nav-menu">
                            <a href="#">Notícias</a>
                            <a href="#">Perguntas</a>
                            <a href="#">Sobre nós</a>
                            <a href="#">Entreterimento</a>
                            <a href="#">Adicionar notícia</a>
                    </nav>
                </div>
            </ Container>
        </React.Fragment>
        )
    }
}

export default Header;