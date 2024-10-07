import React, { useState } from 'react';

const Search = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchType, setSearchType] = useState('symbol'); 

    const handleSearch = (e) => {
        e.preventDefault();
        onSearch(searchTerm, searchType);
    };

    return (
        <form onSubmit={handleSearch} className="mb-4 flex items-center">
            <input 
                type="text" 
                placeholder="Buscar..." 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
                className="border border-gray-300 rounded p-2 mr-2"
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
    );
};

export default Search;