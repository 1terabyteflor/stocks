import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const StockTable = () => {
    const [stocks, setStocks] = useState([]);
    const [searchSymbol, setSearchSymbol] = useState('');
    const [searchName, setSearchName] = useState('');

    useEffect(() => {
        const fetchStocks = async () => {
            const response = await fetch('https://api.twelvedata.com/stocks?source=docs&exchange=NYSE');
            const data = await response.json();
            setStocks(data.data);
        };
        fetchStocks();
    }, []);

    const filteredStocks = stocks.filter(stock => 
        stock.symbol.includes(searchSymbol) && stock.name.toLowerCase().includes(searchName.toLowerCase())
    );

    return (
        <div>
            <input 
                type="text" 
                placeholder="Buscar por símbolo" 
                value={searchSymbol} 
                onChange={(e) => setSearchSymbol(e.target.value)} 
            />
            <input 
                type="text" 
                placeholder="Buscar por nombre" 
                value={searchName} 
                onChange={(e) => setSearchName(e.target.value)} 
            />
            <table>
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

export default StockTable;
