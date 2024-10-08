import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useSearch from '../hooks/useSearch';

const Search = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchType, setSearchType] = useState('symbol');
    const navigate = useNavigate();

    const { suggestions, loading, error } = useSearch(searchTerm, searchType);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm) {
            navigate(`/stock/${searchTerm}`);
        }
        setSearchTerm('');
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
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {suggestions.length > 0 && (
                <ul className="absolute bg-white border border-gray-300 mt-1 w-full z-10">
                    {suggestions.map(stock => (
                        <li 
                            key={stock.symbol} 
                            onClick={() => {
                                setSearchTerm(stock.symbol);
                                navigate(`/stock/${stock.symbol}`); 
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