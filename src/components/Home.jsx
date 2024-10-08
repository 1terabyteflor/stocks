import React from 'react';
import Search from './Search';
import StockTable from './StockTable';
import useStocks from '../hooks/useStocks'; 

const Home = () => {
    const { stocks, filteredStocks, loading, filterStocks } = useStocks();

    return (
        <div className="max-w-4xl mx-auto p-4 work-sans">
            <h1 className="text-5xl font-bold mb-4 text-purple-primary">Stock List</h1>
            <Search onSearch={filterStocks} /> 
            <StockTable stocks={filteredStocks} loading={loading} /> 
        </div>
    );
};

export default Home;