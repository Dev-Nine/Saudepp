import React from 'react';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { Container } from './styles';

const PageSelector = ({
    totalCount,
    currentPage,
    setCurrentPage,
    itemsPerPage,
}) => {
    const totalPages = Math.ceil(totalCount / itemsPerPage);
    const changePage = (e) => {
        if (e.target.value >= 1 && e.target.value <= totalPages) {
            setCurrentPage(e.target.value);
        }
    };

    const incrementPage = () => {
        setCurrentPage((old) => {
            if (old !== totalPages) return 1 + old;
            return old;
        });
    };

    const decrementPage = () => {
        setCurrentPage((old) => {
            if (old !== 1) return old - 1;
            return old;
        });
    };

    return (
        <Container>
            <FiArrowLeft size="24" onClick={decrementPage} />
            Página
            <input type="number" value={currentPage} onChange={changePage} />
            de {totalPages}
            <FiArrowRight size="24" onClick={incrementPage} />
        </Container>
    );
};

export default PageSelector;
