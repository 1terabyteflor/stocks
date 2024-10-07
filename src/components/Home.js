import React from 'react';
import StockTable from './StockTable';

const Home = () => {
    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h1>Bienvenido a la Aplicación de Acciones</h1>
            <StockTable/>
        </div>
    );
};

export default Home;