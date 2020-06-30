import React from 'react'
import { Container, Header, Content } from './styles'

import logo from '../../assets/logoepitacio.png'

const Footer = () => {
    return (
        <Container>
            <div className="content">
                <Header>
                    <h1>Saúde++ - Presidente Epitácio</h1>
                    <hr />
                </Header>
                <Content>
                    <div>
                        <h2>Acesso</h2>
                        <hr />
                        <div>
                            <p>Principal</p>
                            <p>Notícias</p>
                            <p>Saúde e bem estar</p>
                            <p>Sobre nós</p>
                        </div>
                    </div>
                    <div>
                        <h2>Contato</h2>
                        <hr />
                        <div>
                            <p>saude@presidenteepitacio.sp.gov.br</p>
                            <p>gabinete@presidenteepitacio.sp.gov.br</p>
                            <p>(18) 3281 2211</p>
                            <p>(18) 3281 9777</p>
                        </div>
                    </div>
                    <div>
                        <h2>Redes sociais</h2>
                        <hr />
                        <div>
                            <p>Facebook</p>
                            <p>Instagram</p>
                            <p>YouTube</p>
                            <p>Site</p>
                        </div>
                    </div>
                    <div>
                        <h2>Equipe</h2>
                        <hr />
                        <div>
                            <p>Dev Nine Startup</p>
                            <p>devnine.com.br</p>
                        </div>
                    </div>
                </Content>
                <div>
                    <a 
                        target="_blank" 
                        href="http://www.presidenteepitacio.sp.gov.br/"
                        rel="noopener noreferrer"
                    >
                        <img src={logo} alt="Presidente Epitácio" />
                    </a>
                </div>
            </div>
        </Container>
    )
}

export default Footer;
