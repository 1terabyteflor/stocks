import React from 'react';
import Search from './Search';
import StockTable from './StockTable';
import useStocks from '../hooks/useStocks'; 

const Home = () => {
    const { stocks, filteredStocks, filterStocks } = useStocks(); 

    return (
        <div className="max-w-4xl mx-auto p-5">
            <h1 className="text-4xl font-bold mb-4">Stock List</h1>
            <Search onSearch={filterStocks} /> 
            <StockTable stocks={filteredStocks} /> 
        </div>
    );
};

export default Home;