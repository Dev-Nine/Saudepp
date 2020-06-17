import React, {Component} from 'react';

import { FiMenu } from 'react-icons/fi'

import { Container } from './styles'

class Header extends Component {
    constructor(){
        super();
        this.state = {
            dropdown: ''
        }
        this.handleIconClick = this.handleIconClick.bind(this)
    }

    handleIconClick(event) {
        this.setState(prevState => {
            if(prevState.dropdown === 'show-dropdown'){
                setTimeout(() => {
                    this.setState({
                        dropdown: ''
                    })
                }, 600)
                return ({
                    dropdown: 'show-dropdown-back'
                })
            }else{
                return ({
                    dropdown: 'show-dropdown'
                })
            }
        });
    }

    render() {
        return (
            <React.Fragment>
                <Container>
                    <div className="menu">
                        <div className="menu-logo">
                            <a href="#">Saúde++</a>
                            <p>Presidente Epitácio - SP</p>
                        </div>
                        <div className="icon" onClick={this.handleIconClick}>
                            <FiMenu color='#0094DE' size={40} />
                        </div>
                        <nav className={this.state.dropdown}>
                            <a href="#">Notícias</a>
                            <a href="#">Dúvidas frequentes</a>
                            <a href="#">Painel de controle</a>
                            <a href="#">Sobre nós</a>
                        </nav>
                        <img 
                            src="https://avatars1.githubusercontent.com/u/44099109?s=460&v=4" 
                            alt="Avatar"
                        />
                    </div>
                </ Container>
            </React.Fragment>
        )
    }
}

export default Header;