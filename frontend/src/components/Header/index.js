import React, { Component, useState } from 'react';

import { Link } from 'react-router-dom';

import { FiMenu } from 'react-icons/fi';

import { Container } from './styles';

import { useAuth } from '../../hooks/AuthProvider';

function Header() {
   const [dropdown, setDropdown] = useState('');
   const { user, signOut } = useAuth();

   function handleIconClick() {
      setDropdown((prevState) => {
         if (prevState === 'show-dropdown') return '';
         return 'show-dropdown';
      });
   }

   return (
      <>
         <Container>
            <div>
               <div className="menu">
                  <Link to="/" className="menu-logo">
                     <p>Saúde++</p>
                     <p>Presidente Epitácio - SP</p>
                  </Link>
                  <div className="icon" onClick={handleIconClick}>
                     <FiMenu color="#0094DE" size={40} />
                  </div>
                  <nav className={dropdown}>
                     <Link to="/notices">Notícias</Link>
                     <Link to="/faq">Dúvidas frequentes</Link>
                     {!!user && <Link to="/panel">Painel de controle</Link>}
                     <Link to="/about">Sobre nós</Link>
                     {!!user && (
                        <Link
                           to="/"
                           className="logout"
                           onClick={() => signOut()}
                        >
                           Sair
                        </Link>
                     )}
                  </nav>
                  {user && <img src={user.imageUrl} alt="Avatar" />}
               </div>
            </div>
         </Container>
      </>
   );
}

export default Header;
