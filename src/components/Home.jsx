import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Search from './Search';

const Home = () => {
    const [stocks, setStocks] = useState([]);
    const [filteredStocks, setFilteredStocks] = useState([]);

    useEffect(() => {
        const fetchStocks = async () => {
            const response = await fetch('https://api.twelvedata.com/stocks?source=docs&exchange=NYSE');
            const data = await response.json();
            setStocks(data.data);
            setFilteredStocks(data.data); // Inicialmente, mostrar todas las acciones
        };
        fetchStocks();
    }, []);

    const handleSearch = (searchTerm, searchType) => {
        const filtered = stocks.filter(stock => 
            searchType === 'symbol' 
                ? stock.symbol.includes(searchTerm) 
                : stock.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredStocks(filtered);
    };

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <Search onSearch={handleSearch} />
            <table style={{ margin: '20px auto', width: '80%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th>Símbolo</th>
                        <th>Nombre</th>
                        <th>Moneda</th>
                        <th>Tipo</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredStocks.map(stock => (
                        <tr key={stock.symbol}>
                            <td><Link to={`/stock/${stock.symbol}`}>{stock.symbol}</Link></td>
                            <td>{stock.name}</td>
                            <td>{stock.currency}</td>
                            <td>{stock.type}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Home;