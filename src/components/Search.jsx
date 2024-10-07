import React, { useState } from 'react';

const Search = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchType, setSearchType] = useState('symbol'); 

    const handleSearch = (e) => {
        e.preventDefault();
        onSearch(searchTerm, searchType);
    };

    return (
        <form onSubmit={handleSearch} style={{ marginBottom: '20px' }}>
            <input 
                type="text" 
                placeholder="Buscar..." 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
            />
            <div>
                <label>
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
            <button type="submit">Buscar</button>
        </form>
    );
};

export default Search;
