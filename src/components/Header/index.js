import React, {Component} from 'react';


import './styles.css'


 class Header extends Component{

    render(){
        return(
        <React.Fragment>
            <header className="bg">
                <div className="menu">
                    <div className="menu-logo">
                        <a href="#">Saúde++</a>
                        <p>Presidente Epitácio</p>
                    </div>
                    <nav className="nav-menu">
                        <ul>
                            <a href="#">Notícias</a>
                            <a href="#">Perguntas</a>
                            <a href="#">Sobre nós</a>
                            <a href="#">Entreterimento</a>
                            <a href="#">Adicionar notícia</a>
                        </ul>
                    </nav>
                </div>
            </header>
        </React.Fragment>
        )
    }
}

export default Header;