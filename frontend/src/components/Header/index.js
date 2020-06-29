import React, {Component, useState} from 'react';

import { Link } from 'react-router-dom';

import { FiMenu } from 'react-icons/fi'

import { Container } from './styles'

import { useAuth } from '../../hooks/AuthProvider'

function Header(){
    const [dropdown, setDropdown] = useState('');
    const { user } = useAuth();

    function handleIconClick(event) {
        setDropdown(prevState => {
            if(prevState === 'show-dropdown'){
                setTimeout(() => {
                    setDropdown('')
                }, 600)
                return 'show-dropdown-back';
            }else{
                return 'show-dropdown';
            }
        });
    }

    return (
        <React.Fragment>
            <Container>
                <div>
                    <div className="menu">
                        <Link to="/" className="menu-logo">
                            <p>Saúde++</p>
                            <p>Presidente Epitácio - SP</p>
                        </Link>
                        <div className="icon" onClick={handleIconClick}>
                            <FiMenu color='#0094DE' size={40} />
                        </div>
                        <nav className={dropdown}>
                            <Link to="/notices">Notícias</Link>
                            <Link to="/faq">Dúvidas frequentes</Link>
                            { !!user &&
                            <Link to="#">Painel de controle</Link>
                            }
                            <Link to="#">Sobre nós</Link>
                        </nav>
                        { !!user && 
                        <img 
                            src="https://i.redd.it/kgqvza99pno21.jpg" 
                            alt="Avatar"
                        />
                        }   
                    </div>
                </div>
            </ Container>
        </React.Fragment>
    )
}

export default Header;
