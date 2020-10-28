import React from 'react';
import { Container } from './styles';
import Header from '../../../../components/Header';
import Footer from '../../../../components/Footer';
import TextEditor from '../../../../components/TextEditor';

export default function Comments() {
    return (
        <>
            <Header />
            <Container>
                <div className="content">
                    <form>
                        <p>Título</p>
                        <input type="text" placeholder="Titulo" />

                        <p>Conteúdo</p>
                        <TextEditor />

                        <div className="button-container">
                            <div className="button1">
                                <button type="submit">Anexar Imagem</button>
                                <button type="submit">Enviar</button>
                            </div>

                            <div className="button2">
                                <button type="submit">Limpar</button>
                            </div>
                        </div>
                    </form>
                </div>
            </Container>
            <Footer />
        </>
    );
}
