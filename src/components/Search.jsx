import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Search = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchType, setSearchType] = useState('symbol'); 
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        const fetchSuggestions = async () => {
            if (searchTerm) {
                const response = await axios.get(`https://api.twelvedata.com/stocks?source=docs&exchange=NYSE`);
                const data = response.data.data;
                const filteredSuggestions = data.filter(stock => 
                    searchType === 'symbol' 
                        ? stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) 
                        : stock.name.toLowerCase().includes(searchTerm.toLowerCase())
                );
                setSuggestions(filteredSuggestions);
            } else {
                setSuggestions([]);
            }
        };

        fetchSuggestions();
    }, [searchTerm, searchType]);

    const handleSearch = (e) => {
        e.preventDefault();
        onSearch(searchTerm, searchType);
        setSuggestions([]); 
    };

    return (
        <div className="relative mb-4">
            <form onSubmit={handleSearch} className="flex items-center">
                <input 
                    type="text" 
                    placeholder="Buscar..." 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)} 
                    className="border border-gray-300 rounded p-2 mr-2 w-full"
                />
                <div className="flex items-center mr-4">
                    <label className="mr-2">
                        <input 
                            type="radio" 
                            value="symbol" 
                            checked={searchType === 'symbol'} 
                            onChange={() => setSearchType('symbol')} 
                        />
                        Símbolo
                    </label>
                    <label>
                        <input 
                            type="radio" 
                            value="name" 
                            checked={searchType === 'name'} 
                            onChange={() => setSearchType('name')} 
                        />
                        Nombre
                    </label>
                </div>
                <button type="submit" className="bg-blue-500 text-white rounded p-2">Buscar</button>
            </form>
            {suggestions.length > 0 && (
                <ul className="absolute bg-white border border-gray-300 mt-1 w-full z-10">
                    {suggestions.map(stock => (
                        <li 
                            key={stock.symbol} 
                            onClick={() => {
                                setSearchTerm(stock.symbol);
                                onSearch(stock.symbol, 'symbol'); 
                                setSuggestions([]); 
                            }} 
                            className="p-2 hover:bg-gray-200 cursor-pointer"
                        >
                            {stock.symbol} - {stock.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Search;