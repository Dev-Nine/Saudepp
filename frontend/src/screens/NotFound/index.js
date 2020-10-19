import React from 'react';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function NotFound() {
    return (
        <>
            <Header />
            <h1 style={{ padding: 20 }}> 404 - Page not found </h1>
            <Footer />
        </>
    );
}
