import React, { useEffect, useState } from 'react';
import Search from './Search';
import StockTable from './StockTable';

const Home = () => {
    const [stocks, setStocks] = useState([]);
    const [filteredStocks, setFilteredStocks] = useState([]);

    useEffect(() => {
        const fetchStocks = async () => {
            const response = await fetch('https://api.twelvedata.com/stocks?source=docs&exchange=NYSE');
            const data = await response.json();
            setStocks(data.data);
            setFilteredStocks(data.data);
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
        <div className="max-w-4xl mx-auto p-5">
            <h1 className="text-4xl font-bold mb-4">Stock List</h1>
            <Search onSearch={handleSearch} /> 
            <StockTable stocks={filteredStocks} /> 
        </div>
    );
};

export default Home;