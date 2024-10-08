import { useState, useEffect } from 'react';

const useStocks = () => {
    const [stocks, setStocks] = useState([]);
    const [filteredStocks, setFilteredStocks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStocks = async () => {
            setLoading(true); 
            try {
                const response = await fetch('https://api.twelvedata.com/stocks?source=docs&exchange=NYSE');
                const data = await response.json();
                setStocks(data.data);
                setFilteredStocks(data.data);
            } catch (error) {
                console.error('Error', error);
            } finally {
                setLoading(false);
            }
        };
        fetchStocks();
    }, []);

    const filterStocks = (searchTerm, searchType) => {
        const filtered = stocks.filter(stock => 
            searchType === 'symbol' 
                ? stock.symbol.includes(searchTerm) 
                : stock.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredStocks(filtered);
    };

    return { stocks, filteredStocks, loading, filterStocks }; 
};

export default useStocks;