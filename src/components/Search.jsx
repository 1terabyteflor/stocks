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
                    placeholder="Ej: AAM" 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)} 
                    className="border border-gray-300 rounded-xl p-2 mr-2 w-full"
                />
                <button type="submit" className="bg-purple-primary text-white rounded-xl p-2 mr-2">Buscar</button>
            </form>
                        {loading && <p>Cargando...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {suggestions.length > 0 && (
                <ul className="absolute bg-white border border-gray-300 mt-1 w-full z-1">
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

            <div className="flex items-center text-sm gap-x-2 my-2">
                <p>Buscar por</p>
                    <label>
                        <input 
                            type="radio" 
                            value="symbol"
                            className='mr-1' 
                            checked={searchType === 'symbol'} 
                            onChange={() => setSearchType('symbol')} 
                        />
                        símbolo
                    </label>
                    <label>
                        <input 
                            type="radio" 
                            value="name" 
                            className='mr-1' 
                            checked={searchType === 'name'} 
                            onChange={() => setSearchType('name')} 
                        />
                        nombre
                    </label>
                </div>
        </div>
    );
};

export default Search;